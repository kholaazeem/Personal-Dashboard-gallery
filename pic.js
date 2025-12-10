import supabase from "./config.js";

let inputFile = document.getElementById("input-file");
let uplBtn = document.getElementById("upl-btn");
let cards = document.getElementById("cards")
// let image = document.getElementById("image");   ye phly kiya tha just user ko pic dikhnay k liye public url genrate kr k
let editInpfile = document.getElementById("edtInpFile")
let pubUrl;
let imgUrl;

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
        console.log("Error in inserting data into tables/db: " + " " + error)
      }else{
        alert("Succefully upladed in tables/db")
      }


    }else {
      console.log("Error in uploading file: "+ " " + error);
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
         <button class="btn btn-danger"  onclick = "dltCard(${card.id},${card.image})">Delete</button>
     </div>
</div>
`;

});
 }else{
  console.log("Error in fecthing data/imgs from table/db:" + " " + error)
 }


}    

   fetchImg()     


window.startEdit = (oldImgId , oldImgUrl)=>{
  editInpfile.click()
  console.log("Now you can edit/replace your image")
  window.oldImgFileName = oldImgUrl.split('/pictures/')[1]
  console.log(oldImgFileName)
  window.oldImgFileId = oldImgId
  console.log(oldImgFileId)


}
editInpfile.addEventListener('change', async (e)=>{
 console.log("hdjkjks")
  const { data, error } = await supabase
  .storage
  .from('pictures')
  .remove([oldImgFileName])

  if(error){
  console.log("Error in deleting file from bucket:" + " " +" " +  error)
}
})

