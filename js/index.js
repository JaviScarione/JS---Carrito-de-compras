const loginForm = document.querySelector("#loginForm"),
loginUser = document.querySelector("#user"),
loginPassword = document.querySelector("#password"),
submit = document.querySelector("#submit"),
message = document.querySelector("#message");

let tries = 1
function logIn (users) {
    if (users.length === 0) {
        message.innerText = "Usuario no encontrado.";
        tries < 3 ? tries ++ : (submit.disabled = true, message.innerText = "Por favor regístrese.")
        return;
    }
    let userFound = users.find((user) => {
        return user.userName.toLowerCase() === loginUser.value.toLowerCase() && user.password === loginPassword.value;
    })
    userFound ? window.location.href = "./home.html" : message.innerText = "Usuario no encontrado.";
    tries < 3 ? tries ++ : (submit.disabled = true, message.innerText = "Por favor regístrese.");
};        

function loadUsers () {
    const LocalStorage = JSON.parse(localStorage.getItem("users")) || [];
    const SessionStorage = JSON.parse(sessionStorage.getItem("users")) || [];
    let users = [...LocalStorage, ...SessionStorage];
    console.log(users)
    return users;
}

const users = loadUsers();

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();    
    logIn(users);
})