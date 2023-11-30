const registerModal = document.getElementById("registerModal")
const modalContent = document.getElementById("modal-content")
const openModal = document.getElementById("registerDisplay")
const closeButton = document.getElementById("close-btn")

const loginerror = document.getElementById("errormsg")
const createMessage = document.getElementById("createmessage")

openModal.addEventListener("click", ()=>{
    registerModal.style.display = "block"
    modalContent.style.display = "block"
})

closeButton.addEventListener("click", ()=>{
    registerModal.style.display = "none"
    modalContent.style.display = "none"
})

const loginButton = document.getElementById("loginButton")

//login 
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.history.back()
        //window.location.assign("../profile-page/profile.html");
    } else {
        loginerror.textContent = `${data.error}`
        console.log(data.error);
    }
})


//registration
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            authorization: localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        createMessage.textContent = "Account Successfully created"
        setTimeout(() => {
            window.location.assign("login.html");
          }, "2000")
    } else {
        alert(data.error);
    }
})

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token')})


