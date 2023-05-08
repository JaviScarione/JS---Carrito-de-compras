const registerForm = document.querySelector("#registerForm"),
  user = document.querySelector("#name"),
  userName = document.querySelector("#user"),
  email = document.querySelector("#email"),
  password = document.querySelector("#password"),
  remember = document.querySelector("#remember"),
  message = document.querySelector("#message");

  //Recuperamos lo usuarios registrados tanto en LocalStorage como en SessionStorage
let SessionUsers = JSON.parse(sessionStorage.getItem("users")) || [];
let LocalUsers = JSON.parse(localStorage.getItem("users")) || [];

//Creamos la clase para un nuevo registro
class User {
  constructor(user, userName, email, password) {
    this.user = user;
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}

//Agregamos el usuario que se registra
function addUser(arr, user) {
  return arr.push(user);
}


//Guardamos el nuevo array con el usuario agregado en SessionStorage
function saveSessionStorage(arr) {
  return sessionStorage.setItem("users", JSON.stringify(arr));
}

//Guardamos el nuevo array con el usuario agregado en LocalStorage
function saveLocalStorage(arr) {
  return localStorage.setItem("users", JSON.stringify(arr));
}
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = new User( //Capturamos los valores del formulario para crear un usuario
    user.value,
    userName.value,
    email.value,
    password.value
  );
let LocalUserFound = LocalUsers.find((user) => {  //Revisamos que el usuario o email no esten registrados en LocalStorage
  return user.userName == userName.value || user.email == email.value;
})
let SessionUserFound = SessionUsers.find((user) => {  //Revisamos que el usuario o email no esten registrados en SessionStorage
  return user.userName == userName.value || user.email == email.value;
})
if (LocalUserFound || SessionUserFound) {  //Si en el control anterior hubo coincidencias se muetra el error y se muestra un mensaje en el formulario
  Swal.fire({
    text: 'El Usuario y/o Email ingresado ya estan registrados, por favor ingresa nuevamente los datos.',
    icon: 'error',
    showCancelButton: false,
    confirmButtonColor: '#96c93d',
    confirmButtonText: 'Ok'
  }) 
  message.innerText = "Usuario ya registrado."; 
}else {  //Si no hubo coincidencias y el usuario elige la opción "Recordarme" se almacenan los datos en LocalStorage, sino en SessionStorage
  if (remember.checked) {
    addUser(LocalUsers, newUser);
    saveLocalStorage(LocalUsers)
  }else {
    addUser(SessionUsers, newUser);
    saveSessionStorage(SessionUsers);
  }
  Toastify({  //Se muestra un mensaje de éxito en el registro
    text: 'Registro exitoso! 🎉',
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: 'top', 
    position: 'center', 
    stopOnFocus: true,
    style: {
      cursor: 'default',
      background: '#96c93d',
      color: 'white'
    },
    onClick: function(){}
  }).showToast();
  setTimeout(() => {  //Se redirige al Login despues de 2 segundos
  window.location.href = "./index.html";
  }, 2000); 
}
});