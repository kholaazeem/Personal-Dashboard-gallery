import supabase from "./config.js"



let inputFile = document.getElementById("input-file");
let uplBtn = document.getElementById("upl-btn");
let image = document.getElementById("image")
let pubUrl;


async function uplFile() {
    // console.log(inputFile.files[0].name);
    let file = inputFile.files[0];
    let fileName = `${Date.now()} - ${file.name} `
    console.log(file, fileName)

    try {


        const { data, error } = await supabase
            .storage
            .from('pictures')
            .upload(fileName, file, {

            })

        if (data) {
            console.log(data)
            console.log(data.fullPath.split('/'))
            var fileData = data.fullPath.split('/')   //split function array form  bna daita ha and sb ko index pr rkh daita ha
            console.log(fileData)
            console.log(fileData[1])
            pubUrl = fileData[1]

            const { data:  urlData } = supabase
                .storage
                .from('pictures')
                .getPublicUrl(pubUrl)
                if(urlData){
                    console.log(urlData.publicUrl)
                    image.src = urlData.publicUrl
                }
        } else {
            console.log(error)
        }





    } catch (err) {
        console.log(err)
    }
}


uplBtn.addEventListener("click", uplFile)
