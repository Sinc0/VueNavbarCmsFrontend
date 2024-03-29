<template>
    <div id="componentStart">
        
        <!-- menu categories -->
        <div id="menu">
            <span id="menuCategoryLogin" class="menuCategory" v-on:click="displaySelectedMenu('login')">Login</span>
            
            <span class="dot"> • </span>
            
            <span id="menuCategoryRegister" class="menuCategory" v-on:click="displaySelectedMenu('register')">Register</span>
            
            <span class="dot"> • </span>
            
            <span id="menuCategoryAbout" class="menuCategory" v-on:click="displaySelectedMenu('about')">About</span>
        </div>

        <!-- modal: register -->
        <div id="register">
            <label id="registerInfoUsername">username max length: 10</label>
            <label id="registerInfoPassword">password max length: 10</label>
            <label id="registerErrorMessage"></label>
            <input required id="registerUsername" class="inputRegister" type="text" placeholder="username" maxlength="10" />
            <input required id="registerPassword" class="inputRegister" type="password" placeholder="password" maxlength="10" />
            <input required id="registerConfirmPassword" class="inputRegister" type="password" placeholder="password again" maxlength="10" />
            <div id="registerPasswordOverlayImages">
                <img id="iconShowRegister" class="inputOverlayImg" src="/images/icons/iconHidden.png" v-on:click="showPasswordCharacters()" />
            </div>
            <input required id="registerButton" class="buttonRegister" type="button" value="Confirm" v-on:click="register()" />
        </div>

        <!-- modal: login -->
        <div id="login">
            <label id="loginErrorMessage"></label>
            <input required id="loginUsername" class="inputLogin" type="text" placeholder="username" maxlength="10" />
            <input required id="loginPassword" class="inputLogin" type="password" placeholder="password" maxlength="10" />
            <div id="registerLoginOverlayImages">
                <img id="iconShowLogin" class="inputOverlayImg" src="/images/icons/iconHidden.png" v-on:click="showPasswordCharacters()" />
            </div>
            <input required id="loginButton" class="buttonLogin" type="button" value="Confirm" v-on:click="login()" />
        </div>

        <!-- modal: about -->
        <div id="about">

            <!-- why -->
            <p id="aboutWhyTitle" class="aboutTitle">Why?</p>
            <p class="aboutText">This a student project made to learn about Vue, Python, Databases</p>

            <!-- examples -->
            <p id="aboutExamplesTitle" class="aboutTitle">Examples</p>
            <p class="aboutText">#1</p>
            <p class="aboutText">#2</p>
            <p class="aboutText">#3</p>

            <!-- privacy policy -->
            <p id="aboutPrivacyPolicyTitle" class="aboutTitle">Privacy Policy</p>
            <p class="aboutText">Collects Account Data: <span class="yes">Yes</span></p>
            <p class="aboutText">Collects Personal Data: <span class="yes">Yes</span></p>
            <p class="aboutText">Collects Device Data: <span class="no">No</span></p>
            <p class="aboutText">Collects Metrics Data: <span class="no">No</span></p>
            <p class="aboutText">Collects Diagnostics Data: <span class="no">No</span></p>
            <p class="aboutText">Collects Location Data: <span class="no">No</span></p>
            <p class="aboutText">Collects Financial Data: <span class="no">No</span></p>
            <p class="aboutText">Collects Messages Data: <span class="no">No</span></p>
            <p class="aboutText">Collects Media Data: <span class="no">No</span></p>
            <p class="aboutText">Uses Cookies: <span class="yes">Yes</span></p>
            <p class="aboutText">Uses Local Storage: <span class="yes">Yes</span></p>
            <p class="aboutText">Links to Other Websites: <span class="yes">Yes</span></p>
            <p class="aboutText">Policy Might Change: <span class="yes">Yes</span></p>
        </div>
    </div>
</template>


<script>
import {onMounted, onUpdated} from 'vue'
import router from '../router'
import configs from '/configs.json'

export default {
  setup() {
    //variables
    const BACKEND_API = configs.REST_API || "http://127.0.0.1:8000"
    const DEFAULT_DOMAIN = configs.DEFAULT_DOMAIN || "http://127.0.0.1:8000"
    const DEFAULT_TITLE = configs.DEFAULT_TITLE || ""


    //lifecycle hooks
    onMounted(() => 
    { 
        console.log("componentStart mounted")
        document.title = DEFAULT_TITLE
        generatePwaManifest()
    })
    onUpdated(() => { console.log("componentStart updated") })


    function displaySelectedMenu(type)
    {
        //elements
        let register = document.getElementById("register")
        let login = document.getElementById("login")
        let about = document.getElementById("about")
        let menuCategoryLogin = document.getElementById("menuCategoryLogin")
        let menuCategoryRegister = document.getElementById("menuCategoryRegister")
        let menuCategoryAbout = document.getElementById("menuCategoryAbout")
        let registerErrorMessage = document.getElementById("registerErrorMessage")

        //reset elements
        register.style.display = "none"
        login.style.display = "none"
        about.style.display = "none"
        menuCategoryLogin.style.opacity = "0.2"
        menuCategoryRegister.style.opacity = "0.2"
        menuCategoryAbout.style.opacity = "0.2"

        //check type
        if(type == "about") 
        { 
            menuCategoryAbout.style.opacity = "1"
            about.style.display = "block"
        }
        else if(type == "login") 
        { 
            menuCategoryLogin.style.opacity = "1"
            login.style.display = "block"
            registerInfoUsername.style.display = "block"
            registerInfoPassword.style.display = "block"
            loginErrorMessage.innerText = ""
            loginUsername.value = ""
            loginPassword.value = ""
            registerUsername.value = ""
            registerPassword.value = ""
            registerConfirmPassword.value = ""
            registerErrorMessage.innerText = "" 
        }
        else if(type == "register") 
        { 
            menuCategoryRegister.style.opacity = "1"
            register.style.display = "block" 
        }
    }
    

    async function login()
    {
        //elements
        let loginUsername = document.getElementById("loginUsername")
        let loginPassword = document.getElementById("loginPassword")
        let loginErrorMessage = document.getElementById("loginErrorMessage")
        let loginButton = document.getElementById("loginButton")

        //variables
        let username = loginUsername.value
        let password = loginPassword.value

        if(username == "")
        {
            loginErrorMessage.innerText = "username cannot be empty"
            return
        }
        else if(password == "")
        {
            loginErrorMessage.innerText = "password cannot be empty" 
            return
        }

        //disable login button
        loginButton.disabled = true; setTimeout(() => { loginButton.disabled = false }, 1000)

        //set json obj
        let obj = JSON.stringify({ "username": username, "password": password })

        //add user to db
        await fetch(BACKEND_API + "/user-sign-in", {method: 'post', body: obj})
        .then((response) => { return response.json() })
        .then((data) => {
            //debugging
            console.log(data)

            //login successful
            if(data.status == "user login successful") 
            { 
                //set local storage
                localStorage.setItem("cms-account", data.account)
                localStorage.setItem("cms-token", data.token)
                localStorage.setItem("cms-last-login", data.lastLogin)

                //update elements
                loginErrorMessage.style.color = "#00ff00"
                loginErrorMessage.innerText = "login successful"

                //redirect path
                router.push("/backend")
            }

            //login failed
            else if(data.status == "user login failed") 
            { 
                loginErrorMessage.innerText = "login failed" 
            }

        })
    }

    async function register()
    {   
        //elements
        let registerUsername = document.getElementById("registerUsername")
        let registerPassword = document.getElementById("registerPassword")
        let registerConfirmPassword = document.getElementById("registerConfirmPassword")
        let registerErrorMessage = document.getElementById("registerErrorMessage")
        let loginErrorMessage = document.getElementById("loginErrorMessage")
        let registerInfoUsername = document.getElementById("registerInfoUsername")
        let registerInfoPassword = document.getElementById("registerInfoPassword")
        let registerButton = document.getElementById("registerButton")

        //variables
        let username = registerUsername.value.toString().toLowerCase().trim()
        let password = registerPassword.value.toString().toLowerCase().trim()
        let confirmPassword = registerConfirmPassword.value.toString().toLowerCase().trim()
        let obj = ""
        let isInvalid = false
        
        //debugging
        console.log("register: "  + username + "/" + password + "/" + confirmPassword)

        //disable register button
        registerButton.disabled = true; setTimeout(() => { registerButton.disabled = false }, 1000)

        //passwords does not match
        if(confirmPassword != password) 
        { 
            registerInfoUsername.style.display = "none"
            registerInfoPassword.style.display = "none"
            registerErrorMessage.innerText = "passwords does not match" 
        }

        else if(username == "")
        {
            registerInfoUsername.style.display = "none"
            registerInfoPassword.style.display = "none"
            registerErrorMessage.innerText = "username cannot be empty"
            return
        }

        else if(confirmPassword == "")
        {
            registerInfoUsername.style.display = "none"
            registerInfoPassword.style.display = "none"
            registerErrorMessage.innerText = "password cannot be empty" 
            return
        }

        //passwords match
        if(confirmPassword == password)
        {
            //set json obj
            let obj = JSON.stringify({ "username": username, "password": password })
            
            //debugging
            console.log(obj)

            //add user to db
            await fetch(BACKEND_API + "/user-add", {method: 'post', body: obj})
            .then((response) => { return response.json() })
            .then((data) => { 
                
                //username is taken
                if(data.status == "username is taken") 
                { 
                    registerInfoUsername.style.display = "none"
                    registerInfoPassword.style.display = "none"
                    registerErrorMessage.innerText = "username is taken" 
                }

                //user added successfully
                else if(data.status == "user added successfully")
                {
                    displaySelectedMenu("login")
                    loginUsername.value = username
                    loginErrorMessage.style.color = "#00ff00"
                    loginErrorMessage.innerText = "registration successful!"
                }

                else
                {
                    registerInfoUsername.style.display = "none"
                    registerInfoPassword.style.display = "none"
                    registerErrorMessage.innerText = data.status
                }

            })
        }
    }


    function showPasswordCharacters()
    {
        //elements
        let loginPassword = document.getElementById("loginPassword")
        let registerPassword = document.getElementById("registerPassword")
        let registerConfirmPassword = document.getElementById("registerConfirmPassword")
        let iconShowLogin = document.getElementById("iconShowLogin")
        let iconShowRegister = document.getElementById("iconShowRegister")

        //login
        if(loginPassword.type == "text")
        {
            loginPassword.type = "password"
            iconShowLogin.src = "/images/icons/iconHidden.png"
        }
        else if(loginPassword.type == "password")
        {
            loginPassword.type = "text"
            iconShowLogin.src = "/images/icons/iconShow.png"
        }

        //register
        if(registerPassword.type == "text")
        {
            registerPassword.type = "password"
            registerConfirmPassword.type = "password"
            iconShowRegister.src = "/images/icons/iconHidden.png"
        }
        else if(registerPassword.type == "password")
        {
            registerPassword.type = "text"
            registerConfirmPassword.type = "text"
            iconShowRegister.src = "/images/icons/iconShow.png"
        }
    }

    
    function generatePwaManifest()
    {
        //variables
        let manifest = ""
        let link = ""

        //set manifest
        manifest = {
            name: 'Backend',
            short_name: 'Backend',
            display: 'standalone',
            theme_color: '#000000',
            background_color: '#000000',
            icons: [
                { src: DEFAULT_DOMAIN + '/images/pwa/pwa-icon-192x192-blue.png', sizes: '192x192', type: 'image/png', purpose: "any" },
                { src: DEFAULT_DOMAIN + '/images/pwa/pwa-icon-512x512-blue.png', sizes: '512x512', type: 'image/png', purpose: "any" },
            ],
            start_url: window.location.href + "backend"
        }
        
        //create base64 file
        link = document.createElement('link')
        link.rel = 'manifest'
        link.href = `data:application/json;base64,${btoa(JSON.stringify(manifest))}`
        
        //add file link to html header
        document.head.appendChild(link)
    }


    return {
      //functions
      displaySelectedMenu,
      login,
      register,
      showPasswordCharacters
    }
  }
}
</script>


<style scoped>
    /*** scrollbars ***/
    #about::-webkit-scrollbar { height: 0px; width: 0px; }


    /*** elements ***/
    input 
    { 
        width: -webkit-fill-available;
        padding: 16px; 
        border: 0px solid white; 
        color: white; /* #9d00ad */
        background-color:black; 
    }


    /*** ids ***/
    #componentStart 
    { 
        display: block;
        position: absolute;
        top: 0;
        height: 100vh; 
        width: 100vw; 
        color: white;
        background: black;
        /* :root {
            --honeyColor: #1D212E;
            --honeyBorderColor: hsla(294, 100%, 34%, 0.2);
            --size: 30px;
        } */
        /* background-image: linear-gradient(to right, rgba(0,0,0, 0.8) 0 100%), url('/images/componentStartBackgroundImage.jpg'); */
        /* background-size: cover; */
        /* background: linear-gradient(to right, rgba(0,0,0, 0.7) 0 100%),
                    radial-gradient(circle farthest-side at 0% 50%, var(--honeyColor) 23.5%,transparent 0)calc(var(--size)*0.7) var(--size),
                    radial-gradient(circle farthest-side at 0% 50%,var(--honeyBorderColor) 24%,transparent 0)calc(var(--size)*19/30) var(--size),
                    linear-gradient(var(--honeyColor) 14%,transparent 0, transparent 85%, var(--honeyColor) 0)0 0,
                    linear-gradient(150deg, var(--honeyColor) 24%,var(--honeyBorderColor) 0,var(--honeyBorderColor) 26%,transparent 0,transparent 74%,var(--honeyBorderColor) 0,var(--honeyBorderColor) 76%, var(--honeyColor) 0)0 0,
                    linear-gradient(30deg, var(--honeyColor) 24%,var(--honeyBorderColor) 0,var(--honeyBorderColor) 26%,transparent 0,transparent 74%,var(--honeyBorderColor) 0,var(--honeyBorderColor) 76%, var(--honeyColor) 0)0 0,
                    linear-gradient(90deg,var(--honeyBorderColor) 2%, var(--honeyColor) 0, var(--honeyColor) 98%,var(--honeyBorderColor) 0%)0 0 var(--honeyColor);
        background-size:calc(var(--size)*4/3) calc(var(--size)*2); */
    }
    #register 
    { 
        display: none; 
        width: 24vw; 
        margin: auto; 
        margin-bottom: 20px; 
        padding: 10px 30px 30px 30px; 
        background-color: transparent; 
    }
    #login 
    { 
        display: block; 
        width: 24vw; 
        margin: auto; 
        margin-bottom: 20px; 
        padding: 0px; 
        background-color: transparent; 
    }
    #about 
    { 
        display: none;
        max-height: 84vh;
        width: 24vw; 
        margin: auto; 
        margin-bottom: 20px; 
        padding: 0px;
        overflow-y: scroll;
        background-color: transparent; 
    }
    #menu 
    { 
        display: block; 
        width: 30vw; 
        margin: auto; 
        margin-top: 4vh; 
        padding: 10px 20px 10px 20px;
        font-weight: bold;
        font-size: 18px;
        user-select: none;
        /* border: 1px solid white; */
        background-color: transparent;
    }
    #registerErrorMessage 
    { 
        display: block; 
        margin: 20px 0px 40px 0px; 
        font-weight: bold; 
        font-size: 22px; 
        user-select: none;
        opacity: 0.6; 
        color: #9d00ad; 
    }
    #loginErrorMessage 
    { 
        display: block; 
        margin: 20px 0px 30px 0px; 
        font-weight: bold; 
        font-size: 22px; 
        user-select: none;
        opacity: 0.4; 
        color: #9d00ad; 
    }
    #registerInfoUsername 
    { 
        display: block; 
        margin: 10px 0px 0px 0px; 
        font-weight: bold; 
        font-size: 22px; 
        user-select: none;
        opacity: 0.4;
        color: #9d00ad; 
    }
    #registerInfoPassword 
    { 
        display: block; 
        margin: 0px 0px 30px 0px; 
        font-weight: bold; 
        font-size: 22px;
        user-select: none;
        opacity: 0.4;
        color: #9d00ad; 
    }
    #loginButton { margin: 20px 0px 0px 0px; }
    #registerButton { margin: 20px 0px 0px 0px; }
    #loginUsername 
    { 
        border-top: 4px solid hsla(294, 100%, 34%, 0.7); 
        border-left: 4px solid hsla(294, 100%, 34%, 0.7); 
        border-right: 4px solid hsla(294, 100%, 34%, 0.7); 
    }
    #loginPassword 
    { 
        border-bottom: 4px solid hsla(294, 100%, 34%, 0.7); 
        border-left: 4px solid hsla(294, 100%, 34%, 0.7); 
        border-right: 4px solid hsla(294, 100%, 34%, 0.7); 
    }
    #registerUsername 
    { 
        border-top: 4px solid hsla(294, 100%, 34%, 0.7); 
        border-left: 4px solid hsla(294, 100%, 34%, 0.7); 
        border-right: 4px solid hsla(294, 100%, 34%, 0.7); 
    }
    #registerPassword 
    { 
        border-left: 4px solid hsla(294, 100%, 34%, 0.7); 
        border-right: 4px solid hsla(294, 100%, 34%, 0.7); 
    }
    #registerConfirmPassword
    { 
        border-left: 4px solid hsla(294, 100%, 34%, 0.7); 
        border-right: 4px solid hsla(294, 100%, 34%, 0.7);
        border-bottom: 4px solid hsla(294, 100%, 34%, 0.7); 
    }
    #menuCategoryAbout { opacity: 0.2; }
    #menuCategoryLogin { opacity: 1; }
    #menuCategoryRegister { opacity: 0.2; }
    #registerPasswordOverlayImages { display: block; height: 0; width: 24vw; text-align: right; background-color: red; }
    #registerLoginOverlayImages { display: block; height: 0; width: 24vw; text-align: right; background-color: red; }
    #iconShowLogin { top: -53px; left: -16px; }
    #iconShowRegister { top: -53px; left: -16px; }


    /*** classes ***/
    .aboutTitle { margin: 60px 0px 12px 0px; font-size: 28px; font-weight: bold; }
    .inputRegister { display: block; padding: 16px; width: -webkit-fill-available; font-size: 22px; font-weight: bold; }
    .inputLogin { display: block; padding: 16px; width: -webkit-fill-available; font-size: 22px; font-weight: bold; }
    .dot { margin: 0px 10px 0px 10px; opacity: 0.1; }
    .buttonRegister 
    { 
        width: -webkit-fill-available; 
        padding: 22px; 
        font-weight: bold; 
        font-size: 24px;
        opacity: 0.2; 
        color: white;
        background-color: transparent; 
    }
    .buttonRegister:active { opacity: 1; }
    .buttonLogin 
    { 
        width: -webkit-fill-available; 
        padding: 22px; 
        font-weight: bold; 
        font-size: 24px; 
        color: white;
        opacity: 0.2;
        background-color: transparent; 
    }
    .buttonLogin:active { opacity: 1; }
    .menuCategory { font-size: 26px; opacity: 0.2; color: white }
    .aboutTextItem { font-size: 24px; font-weight: bold; user-select: none; opacity: 0.6; color: white; /* #9d00ad */ }
    .inputOverlayImg { position: relative; display: inline-block; height: 40px; width: 40px; }
    .aboutText { margin: 0px; margin: 6px 0px 6px 0px; padding: 0px; font-weight: bold; font-size: 20px; opacity: 0.7; text-align: center }
    .no { color: red; }
    .yes { color: lightgreen; }


    /*** mobile ***/
    @media screen and (max-width: 1000px) 
    {
        #componentStart { overflow-x: hidden; }
        #menu { width: 90vw; }
        #register { width: 80vw; }
        #login { width: 80vw; }
        #about { width: 80vw; }
        #registerInfoUsername { font-size: 20px; }
        #registerInfoPassword { font-size: 20px; }
        #registerErrorMessage { font-size: 20px; }
        #loginErrorMessage { font-size: 20px; }
        #registerPasswordOverlayImages { display: block; height: 0; width: 80vw; text-align: right; background-color: red; }
        #registerLoginOverlayImages { display: block; height: 0; width: 80vw; text-align: right; background-color: red; }
        #iconShowLogin { top: -53px; left: -16px; }
        #iconShowRegister { top: -53px; left: -16px; }

        .aboutTextItem { font-size: 20px; }
        .menuCategory { font-size: 24px; }
    }
</style>