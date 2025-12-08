import supabase from "./config.js";

let inputFile = document.getElementById("input-file");
let uplBtn = document.getElementById("upl-btn");
let image = document.getElementById("image");
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

      // generate public url(text form of) for user or to save images/vid/audio in supabase/database bcz db only save text
     
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
