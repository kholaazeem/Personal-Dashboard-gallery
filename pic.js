import supabase from "./config.js"



let inputFile = document.getElementById("input-file");
console.log(inputFile.files);

let uplBtn = document.getElementById("upl-btn");
console.log(uplBtn)

async function uplFile() {
    // console.log(inputFile.files[0].name);
    let file = inputFile.files[0];
    let fileName = `${Date.now()} ${file.name} `
    //    console.log(file,fileName)

    try {


        const { data, error } = await supabase
            .storage
            .from('pictures')
            .upload(fileName, file, {

            })

        if (data) {
            console.log(`Data inert succesfuly: ${data}`)

              const { data : {urlData} } = supabase
                .storage
                .from('pictures')
                .getPublicUrl(fileName)

               
                           console.log("Public URL:", urlData.publicUrl);
                
        } else {
            console.log(`Supabase Error: ${error}`)
          
        }


























    } catch (err) {
        console.log(err)
    }
}


uplBtn.addEventListener("click", uplFile)
