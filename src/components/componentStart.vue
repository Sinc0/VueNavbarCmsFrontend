<template>
    <div id="componentStart">

        <div id="menu">
            <span v-on:click="displaySelectedMenu('info')">Info</span>
            <span class="dot"> • </span>
            <span v-on:click="displaySelectedMenu('login')">Login</span>
            <span class="dot"> • </span>
            <span v-on:click="displaySelectedMenu('register')">Register</span>
            <span class="dot"> • </span>
            <span v-on:click="displaySelectedMenu('about')">About</span>
        </div>

        <div id="register">
            <label id="registerInfoUsername">username max characters: 10</label>
            <label id="registerInfoPassword">password max characters: 10</label>
            <label id="registerErrorMessage"></label>
            <input id="registerUsername" class="inputRegister" type="text" placeholder="username" maxlength="10" />
            <input id="registerPassword" class="inputRegister" type="password" placeholder="password" maxlength="10" />
            <input id="registerConfirmPassword" class="inputRegister" type="password" placeholder="confirm password" maxlength="10" />
            <input id="registerButton" class="buttonRegister" type="button" value="Register" v-on:click="register()" />
        </div>

        <div id="login">
            <label id="loginErrorMessage"></label>
            <input id="loginUsername" class="inputLogin" type="text" placeholder="username" maxlength="10" />
            <input id="loginPassword" class="inputLogin" type="password" placeholder="password" maxlength="10" />
            <input id="loginButton" class="buttonLogin" type="button" value="Login" v-on:click="login()" />
        </div>

    </div>
</template>


<script>
import {onMounted, onUpdated} from 'vue'
import router from '../router'

export default {
  setup() {
    //variables
    const BACKEND_API = "http://127.0.0.1:8000"


    //lifecycle hooks
    onMounted(() => { console.log("componentStart mounted") })
    onUpdated(() => { console.log("componentStart updated") })


    //functions
    function displaySelectedMenu(type)
    {
        //elements
        let register = document.getElementById("register")
        let login = document.getElementById("login")
        let registerErrorMessage = document.getElementById("registerErrorMessage")

        //reset elements
        register.style.display = "none"
        login.style.display = "none"
        // about.style.display = "none"
        // info.style.display = "none"

        //check type
        if(type == "info") { }
        else if(type == "about") { }
        else if(type == "login") 
        { 
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
        else if(type == "register") { register.style.display = "block" }
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

                //set vuex
                // store.dispatch('storage/actionSetAccountLoginInfo', {"account": data.account, "token": data.token, "lastLogin": data.lastLogin})
                
                //update elements
                loginErrorMessage.style.color = "#00ff00"
                loginErrorMessage.innerText = "login successful"

                //redirect path
                router.push("/backend")
            }

            //login failed
            else if(data.status == "user login failed") 
            { 
                loginErrorMessage.style.color = "red"
                loginErrorMessage.innerText = "login failed" 
            }

        })
    }

    async function logout()
    {   
        // let username = localStorage.getItem("cms-account")
        // let token = localStorage.getItem("cms-token")
        // let lastLogin = localStorage.getItem("cms-last-login")
        // let obj = JSON.stringify({ "username": username, "token": token, "lastLogin": lastLogin })

        // //add user to db
        // await fetch(BACKEND_API + "/user-sign-out", {method: 'post', body: obj})
        // .then((response) => { return response.json() })
        // .then((data) => {
        //     //debugging
        //     console.log(data)

        //     //logout successful
        //     if(data.status == "user login successful") 
        //     { 
        //         //set local storage
        //         localStorage.setItem("cms-account", "")
        //         localStorage.setItem("cms-token", "")
        //         localStorage.setItem("cms-last-login", "")

        //         //redirect
        //         // router.push("/")
        //     }

        //     //login failed
        //     else if(data.status == "user login failed") 
        //     { 
                
        //     }

        // })
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
        let username = registerUsername.value.toString().toLowerCase()
        let password = registerPassword.value.toString().toLowerCase()
        let confirmPassword = registerConfirmPassword.value.toString().toLowerCase()
        let obj = ""
        let isInvalid = false
        
        //debugging
        console.log("register: "  + username + "/" + password + "/" + confirmPassword)

        //disable register button
        registerButton.disabled = true; setTimeout(() => { registerButton.disabled = false }, 1000)

        //forbidden character check
        // if(username == "") { isInvalid = true }
        // else if(username.includes(" ")) { isInvalid = true }
        // else if(username.includes(".")) { isInvalid = true }
        // else if(username.includes(",")) { isInvalid = true }
        // else if(username.includes("<")) { isInvalid = true }
        // else if(username.includes(">")) { isInvalid = true }
        // else if(username.includes(";")) { isInvalid = true }
        // else if(username.includes(":")) { isInvalid = true }
        // else if(username.includes("/")) { isInvalid = true }
        // else if(username.includes("\\")) { isInvalid = true }
        // else if(username.includes("!")) { isInvalid = true }
        // else if(username.includes("@")) { isInvalid = true }
        // else if(username.includes("null")) { isInvalid = true }
        
        //username is invalid
        // if(isInvalid == true)
        // {
        //     registerErrorMessage.innerText = "username is invalid";
        //     registerInfoUsername.style.display = "none"
        //     registerInfoPassword.style.display = "none"
        //     return
        // }

        //passwords does not match
        if(confirmPassword != password) 
        { 
            registerInfoUsername.style.display = "none"
            registerInfoPassword.style.display = "none"
            registerErrorMessage.innerText = "passwords does not match" 
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


    return {
      //variables

      //functions
      displaySelectedMenu,
      login,
      register,
      logout
    }


  }
}
</script>


<style scoped>
    #componentStart 
    { 
        display: block;
        position: absolute;
        top: 0;
        height: 100vh; 
        width: 100vw; 
        color: white; 
        /* background-image: url('https://c.tenor.com/S89fWSFaFowAAAAd/tenor.gif'); /* 'https://wallpaperaccess.com/full/1374109.jpg' */
        background-color: black; 
    }
    #register { display: none; width: 300px; margin: auto; margin-bottom: 20px; padding: 10px 30px 30px 30px; background-color: black; }
    #login { display: block; width: 300px; margin: auto; margin-bottom: 20px; padding: 30px; background-color: black; }
    #menu 
    { 
        display: block; 
        width: 320px; 
        margin: auto; 
        margin-top: 30vh; 
        padding: 10px 20px 10px 20px;
        font-weight: bold;
        font-size: 18px;
        user-select: none;
        /* border: 1px solid white; */
        background-color: black;
    }
    #registerErrorMessage { display: block; margin: 0px 0px 20px 0px; font-weight: bold; user-select: none; color: red; }
    #loginErrorMessage { display: block; margin: 0px 0px 30px 0px; font-weight: bold; user-select: none; color: red; }
    #registerInfoUsername { display: block; margin: 0px 0px 0px 0px; font-weight: bold; user-select: none; color: red; }
    #registerInfoPassword { display: block; margin: 0px 0px 0px 0px; font-weight: bold; user-select: none; color: red; }

    .inputRegister { display: block; padding: 6px; width: -webkit-fill-available; font-size: 16px; font-weight: bold; }
    .inputLogin { display: block; padding: 6px; width: -webkit-fill-available; font-size: 16px; font-weight: bold; }
    .dot { margin: 0px 10px 0px 10px; }
    .buttonRegister { width: -webkit-fill-available; padding: 8px; font-weight: bold; font-size: 16px; color: black; }
    .buttonLogin { width: -webkit-fill-available; padding: 8px; font-weight: bold; font-size: 16px; color: black; }
</style>