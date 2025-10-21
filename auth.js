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
            location.href = "login.html";
        }

    } catch (err) {
        console.log(err)
    }
}

signupPage && signupPage.addEventListener("submit", signup);



       /////////////login page

       let loginPage = document.getElementById("login-page")
       let loginEmail = document.getElementById("login-email")
       let loginPassword = document.getElementById("login-password")
      
       
       async function login(e) {
           e.preventDefault()
           try {
               if (!loginEmail.value) {
                   alert("Please Enter your Email")
                   return
               }
               if (!loginPassword.value) {
                   alert("Please Enter your Password")
                   return
               }
            
               const { data, error } = await supabase.auth.signInWithPassword({
                email: loginEmail.value,
                password: loginPassword.value,
              })

               if (error) {
                   console.log(error)
               } else {
                   location.href = "home.html";
               }
       
           } catch (err) {
               console.log(err)
           }
       }
       
       loginPage && loginPage.addEventListener("submit", login)

            //////////logout
       
       let logoutBtn = document.getElementById("logout-btn")

     console.log(logoutBtn);
       async function logout(){
       
        try {
            const { error } = await supabase.auth.signOut()


        if (!error) {
            alert("Logged out successfully")
            location.href="login.html"
        }



       } catch (err) {
           console.log(err) 
        }
    }

    logoutBtn && logoutBtn.addEventListener("click",logout)