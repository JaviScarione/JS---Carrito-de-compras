const registerForm = document.querySelector("#registerForm"),
  user = document.querySelector("#name"),
  userName = document.querySelector("#user"),
  email = document.querySelector("#email"),
  password = document.querySelector("#password"),
  remember = document.querySelector("#remember"),
  message = document.querySelector("#message");

let SessionUsers = JSON.parse(sessionStorage.getItem("users")) || [];
let LocalUsers = JSON.parse(localStorage.getItem("users")) || [];

class User {
  constructor(user, userName, email, password) {
    this.user = user;
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}

function addUser(arr, user) {
  return arr.push(user);
}

function saveSessionStorage(arr) {
  return sessionStorage.setItem("users", JSON.stringify(arr));
}

function saveLocalStorage(arr) {
  return localStorage.setItem("users", JSON.stringify(arr));
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = new User(
    user.value,
    userName.value,
    email.value,
    password.value
  );
let LocalUserFound = LocalUsers.find((user) => {
  return user.userName == userName.value || user.email == email.value;
})
let SessionUserFound = SessionUsers.find((user) => {
  return user.userName == userName.value || user.email == email.value;
})
if (LocalUserFound || SessionUserFound) {
  message.innerText = "Usuario ya registrado."; 
}else {
  if (remember.checked) {
    addUser(LocalUsers, newUser);
     saveLocalStorage(LocalUsers)
  }else {
    addUser(SessionUsers, newUser);
    saveSessionStorage(SessionUsers);
  }
  window.location.href = "./index.html";
}
});