import supabase from "./config.js";

let inputFile = document.getElementById("input-file");
let uplBtn = document.getElementById("upl-btn");
let cards = document.getElementById("cards")
// let image = document.getElementById("image");   ye phly kiya tha just user ko pic dikhnay k liye public url genrate kr k
let editInpfile = document.getElementById("edtInpFile")
let pubUrl;
let imgUrl;
let newPubUrl;
let updImgUrl;

async function uplFile() {
  // console.log(inputFile.files[0].name);
  let file = inputFile.files[0];
  let fileName = `${Date.now()} - ${file.name} `;
  console.log(file, fileName);

  try {
    // uplaod image/vid in supabase

    const { data, error } = await supabase.storage
      .from("pictures")
      .upload(fileName, file, {});

    if (data) {
      console.log(data);
      console.log(data.fullPath);
      var fileData = data.fullPath.split("/"); //split function array form  bna daita ha and sb ko index pr rkh daita ha
      console.log(fileData);
      console.log(fileData[1]);
      pubUrl = fileData[1];

                        // generate public url(text form of) to show user or to save images/vid/audio in supabase/database bcz db only save text
     
      const { data: urlData } = supabase.storage
        .from("pictures")
        .getPublicUrl(pubUrl);
      if (urlData) {
        console.log(urlData);
        //image.src = urlData.publicUrl
        imgUrl = urlData.publicUrl;
       
                          //insert/add publicurl (image) in tables/database

        const { error } = await supabase
          .from("userpics")
          .insert({image : imgUrl});
      }
      if(error){
        console.log("Error in inserting data into tables/db: ", error)
      }else{
        alert("Succefully upladed in tables/db")
          fetchImg()
      }


    }else {
      console.log("Error in uploading file: ", error);
    }


  } catch (err) {
    console.log(err);
  }
}

uplBtn.addEventListener("click", uplFile);


                         // fetch images/data from tables to show user


  

async function fetchImg() {
   cards.innerHTML= " "

    const { data, error } = await supabase
  .from('userpics')
  .select("*")

 if(data){
  data.forEach(card => {
  console.log(card)
 cards.innerHTML += `
<div class="card mb-4" style="width: 18rem;">
     <img src="${card.image}" class="card-img-top" alt="">
     <div class="card-body">
         <button class="btn btn-success me-2" onclick = "startEdit(${card.id},'${card.image}')">Edit</button>
         <button class="btn btn-danger"  onclick = "dltCard(${card.id},'${card.image}')">Delete</button>
     </div>
</div>
`;

});
 }else{
  console.log("Error in fecthing data/imgs from table/db:", error)
 }

 
} 

  fetchImg()     
   
           // EDIT FUNCTIONALITY  Start
window.startEdit = (oldImgId , oldImgUrl)=>{   // type module pr onclick error daita so global function /variable bnaye hain
  editInpfile.click()  // input jo hidden ha usko js se clcik krwaya ...jsy hi edit btn pr click ho ye input bhi open ho jae 
  console.log("Now you can edit/replace your image")
  // window.oldImgFileName = oldImgUrl.split('/pictures/')[1]
  // console.log(oldImgFileName)
  window.oldImgFileName = decodeURIComponent(oldImgUrl.split('/pictures/')[1])   //browser spaces and special charc ko "URL safe format" mn convert kr daita ha kuch iss trh===>[1733893910%20-%20my%20photo.png] ye encoding hoti h isi ko decode krny k liye decodeURIComponent() use kiya
console.log("Decoded file name:", oldImgFileName)

  window.oldImgFileId = oldImgId
  console.log(oldImgFileId)


}
editInpfile.addEventListener('change', async (e)=>{
   console.log("Change event triggered");

            // remove image form bucket

  const { data, error } = await supabase
  .storage
  .from('pictures')
  .remove([oldImgFileName])

  if(error){
   console.log("Error in deleting file from bucket:", error);
}else{
  console.log("File deleted successfully:", data)
}

// console.log(e.target.files[0])
// console.log(e.target.files[0].name)


const newFile = e.target.files[0]
const newFileName =  `${Date.now()}-${e.target.files[0].name}`
console.log(newFile,newFileName)


        // uplaod  new image 

const { data:uplData, error: uplError } = await supabase.storage
      .from("pictures")
      .upload(newFileName, newFile, {});


      if(uplData){
        console.log(uplData)
        console.log(uplData.fullPath)
        var newFileData = uplData.fullPath.split('/')
        console.log(newFileData)
        console.log(newFileData[1])
        newPubUrl = newFileData[1]

           //get public url of new image

        const { data: newPubUrlData } = supabase.storage
        .from("pictures")
        .getPublicUrl(newPubUrl);

        if(newPubUrlData){
          console.log(newPubUrlData)
          console.log(newPubUrlData.publicUrl)
          updImgUrl = newPubUrlData.publicUrl

             //update image in table/db

            const { error } = await supabase
          .from("userpics")
          .update({image : updImgUrl})
           .eq('id', oldImgFileId); //use old id qk insert nhi updaate krrhy hain k iss specific id ki image ka url update kro
      }
      if(error){
        console.log("Error in inserting data into tables/db: ", error)
      }else{
        alert("Succefully edit pic")
          fetchImg()
      }

    
        

    }
      console.log("Error in uploading new file in bucket: ",uplError)
})

          //EDIT FUNCTIONALITY Finish



           // DELETE FUNCTIONALITY    

           window.dltCard = async function (dltId , dltImgUrl){
            alert("Are you sure you want to delete this image?")
            console.log(dltId , dltImgUrl)

            // delete image from bucket

            const dltImgFileName = (dltImgUrl.split('/pictures/')[1])
            console.log("Decoded file name to delete:", dltImgFileName)

            const { data: dltData, error: dltError } = await supabase
            .storage
            .from('pictures')
            .remove([dltImgFileName])

            if(dltError){
             console.log("Error in deleting file from bucket:", dltError);
          }else{
            console.log("File deleted successfully from bucket:", dltData)
          }

            // delete image data from table/db

            const { data, error } = await supabase
            .from('userpics')
            .delete()
            .eq('id', dltId)
            .select('*')

           if(error){
            console.log("Error in deleting data from tables/db:", error)
           }else{
            alert("Succefully deleted image data from table/db")
            fetchImg()                                                                                    

           }
          }