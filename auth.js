import supabase from "/config.js"

let signupPage = document.getElementById("signup-page")
let signupEmail = document.getElementById("signup-email")
let signupPassword = document.getElementById("signup-password")
let signupPhone = document.getElementById("signup-phone#")
let signupName = document.getElementById("signup-name")

async function signup(e) {
    e.preventDefault()
    try {
        if (!signupEmail.value) {
            alert("Please Enter your Email")
            return
        }
        if (!signupPassword.value) {
            alert("Please Enter your Password")
            return
        }
        const { data, error } = await supabase.auth.signUp(
            {
                email: signupEmail.value,
                password: signupPassword.value,
                options: {
                    data: {
                        name: signupName.value,
                        phone: signupPhone.value,
                    }
                }
            }
        )
        if (error) {
            console.log(error)
        } else {
            location.href = "home.html";
        }

    } catch (err) {
        console.log(err)
    }
}

signupPage.addEventListener("submit", signup)



       /////////////login page

