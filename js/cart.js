const count = document.querySelector("#count"),
cartList = document.querySelector("#cartList"),
back = document.querySelector("#back"),
clear = document.querySelector("#clear"),
total = document.querySelector("#total"),
finish = document.querySelector("#finish");

let itemsQuantity, Total;
let actualUser = JSON.parse(localStorage.getItem("actualUser"));  //Recuperamos el usuario actual

function getCart () {  //Funcion para recuperar  lo que hay en el carrito del usuario
    let Cart = JSON.parse(localStorage.getItem(`${actualUser.userName}-cart`));
    return Cart;
}
let cart = getCart(); //Recuperamos lo que hay en el carrito

function ItemsQuantity () {  //Funcion para obtener la cantidad total de items para mostrar la notificacion en el header, en este punto hay contenido si o si
  itemsQuantity = cart.reduce((acc, prod) => {
    return acc += parseInt(prod.cantidad);
  }, 0);
  count.innerText = itemsQuantity;
}
ItemsQuantity();

function getTotal () {  //Funcion para obtener el precio total de la compra
  Total = cart.reduce((acc, prod) => {
      return acc += (prod.cantidad * prod.precio);
  }, 0);
  total.innerText = `Total (${itemsQuantity} items): $${Total.toLocaleString('es-ES', { useGrouping: true})}`;
}
getTotal();

function deleteProduct (arr, id) {  //Funcion para eliminar un producto del carrito
    const itemDeleted = arr.filter(prod => prod.id != id)
    return itemDeleted;
}

function saveLocalStorage(arr) {  //Funcion para almacenar el carrito en LocalStorage
    localStorage.setItem(`${actualUser.userName}-cart`, JSON.stringify(arr));
}

function renderCart (arr) {  //Funcion para renderizar los productos en el carrito
    cartList.innerHTML = "";
    for (const product of arr) {
        let div = document.createElement("div");    
        div.innerHTML =
        `<hr class="mb-3"> 
        <div class="col-1 d-flex justify-content-center align-items-center">
          <button type="button" class="btn remove" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
        </div>               
        <div class="col-2 d-flex justify-content-center">
          <img src=${product.img} class="card-img" alt="Imagen Producto ${product.id}">
        </div>
        <div class="col-7 col-md-6 description">                       
          <h6>${product.nombre}</h6>            
          <p>Cantidad: ${product.cantidad}</p>            
          <p>Precio: $${product.precio.toLocaleString('es-ES', { useGrouping: true})}</p>            
          </div>
        <div class="col-2  col-md-offset-1 d-flex align-items-center justify-content-end pe-3">
          <h5>$${(product.precio * product.cantidad).toLocaleString('es-ES', { useGrouping: true})}</h5>
        </div>`
        div.classList =  "row my-2 mx-0 Item"   
        cartList.appendChild(div);
    }
    const item = [...document.getElementsByClassName("remove")];  //A cada producto en el carrito se le agrega el evento click para eliminarlo
    item.forEach((el) => {
        el.addEventListener("click", () => {
            cart = deleteProduct(cart, el.id);  //Se elimina del carrito
            saveLocalStorage(cart);  //Guardamos el carrito actualizado
            cart.length > 0 ? renderCart(cart) : window.location.href = "./home.html";  //si hay algo en el carrito se muestra, sino se redirige al Home
            ItemsQuantity();  //Si hay algo en el carrito se actualiza la cantidad de items en el icono del header
            getTotal(); //siSi hay carrito se obtiene el total de la compra actualizado
    });
  });
}

renderCart(cart); 

back.addEventListener("click", () => window.location.href = "./home.html")  //Opcion de volver al Home para seguir comprando

clear.addEventListener("click", () => {  //Vaciar el carrito
  Swal.fire({
    title: 'Seguro deseas vaciar el carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#96c93d',
    cancelButtonColor: '#fa9102',
    confirmButtonText: 'Si, vaciar el carrito!'
  }).then((result) => {
    if (result.isConfirmed) {          
      Swal.fire({
        title: 'Carrito vaciado!',
        text: "Serás redirigido a la página de inicio.",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#96c93d',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          cart=[],
          saveLocalStorage(cart),
          window.location.href = "./home.html"
        }
      })
    }
  })
})

finish.addEventListener("click", () => {  //Finalización de compra
  Swal.fire({
    title: 'Seguro deseas finalizar la compra?',
    text: 'Estas a tiempo de agregar mas productos!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#96c93d',
    cancelButtonColor: '#fa9102',
    confirmButtonText: 'Si, finalizar compra!'
  }).then((result) => {
    if (result.isConfirmed) {          
      Swal.fire({
        title: 'Gracias por tu compra!',
        text: `Realizaste la compra de ${itemsQuantity} producto/s por un total de $${Total.toLocaleString('es-ES', { useGrouping: true})}.`,
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#96c93d',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          cart=[],
          saveLocalStorage(cart),
          window.location.href = "./home.html"
        }
      })
    }
  })
})