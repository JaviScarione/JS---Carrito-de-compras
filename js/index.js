const loginForm = document.querySelector("#loginForm"),
loginUser = document.querySelector("#user"),
loginPassword = document.querySelector("#password"),
submit = document.querySelector("#submit"),
message = document.querySelector("#message");

let tries = 1;  //Establecemos la cantidad de intentos en 1 (máximo 3)
function logIn (users) {
    if (users.length === 0) { //si no hay usuarios registrados, muestra la alerta de error
        Swal.fire({
            text: 'Los datos ingresados no son válidos.',
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#96c93d',
            confirmButtonText: 'Ok'
        })
        message.innerText = "Usuario no encontrado.";  //Se muestra un mensaje dentro del formulario
        tries < 3 ? tries ++ : (submit.disabled = true, message.innerText = "Por favor regístrese.") //Si no hay USUARIOS y la cantidad de intentos es menor a 3 la aumentamos en 1, caso contrario se inhabilita el boton de inicio de sesion y se pide al usuario que se registre.
        return;
    }
    let userFound = users.find((user) => {  //Si hay usuarios registrados, buscamos el que coincida con los datos ingresados
        return user.userName.toLowerCase() === loginUser.value.toLowerCase() && user.password === loginPassword.value;
    })
    userFound ? (localStorage.setItem("actualUser", JSON.stringify(userFound)), window.location.href = "./home.html") : message.innerText = "Usuario no encontrado."; 
    // Si hay coincidencia en los datos, se almacena el usuario actual en LocalStorage, sino se notifica del error
    if (!userFound) {
        Swal.fire({
            text: 'Los datos ingresados no son válidos.',
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#96c93d',
            confirmButtonText: 'Ok'
        })
    }
    tries < 3 ? tries ++ : (submit.disabled = true, message.innerText = "Por favor regístrese."); //Si no hay COINCIDENCIA y la cantidad de intentos es menor a 3 la aumentamos en 1, caso contrario se inhabilita el boton de inicio de sesion y se pide al usuario que se registre.
};        

function loadUsers () {  //Recuperamos los usuarios almacenados tanto en LocalStorage como en SessionStorage
    const LocalStorage = JSON.parse(localStorage.getItem("users")) || [];
    const SessionStorage = JSON.parse(sessionStorage.getItem("users")) || [];
    let users = [...LocalStorage, ...SessionStorage];
    return users;
}

const users = loadUsers(); //Ejecutamos la función para obtener los usuarios

loginForm.addEventListener("submit", (e) => { //Capturamos el evento click para iniciar sesion
    e.preventDefault();    
    logIn(users);
})