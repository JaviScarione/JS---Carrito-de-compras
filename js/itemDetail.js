const Item = document.querySelector("#item"),
count = document.querySelector("#count"),
cartLink = document.querySelector("#cart"),
exit = document.querySelector("#exit");

let item;

const actualUser = JSON.parse(localStorage.getItem("actualUser"));  //Recuperamos el usuario actual

if (!actualUser) {
    Swal.fire({
    title: 'No has iniciado sesión!',
    icon: 'error',
    showCancelButton: false,
    confirmButtonColor: '#96c93d',
    confirmButtonText: 'Iniciar Sesión'
}).then((result) => {
    if (result.isConfirmed) {
    window.location.href = "./index.html"
    }
});
}else {

let cart = JSON.parse(localStorage.getItem(`${actualUser.userName}-cart`)) || [];  //Recuperamos el carrito del usuario actual, sino creamos un carrito vacio

function itemsQuantity (arr) {  //Funcion para obtener la cantidad total de items para mostrar la notificacion en el header, sino no se muestra nada.
    const itemsQuantity = arr.reduce((acc, prod) => {
        return acc += parseInt(prod.cantidad);
    }, 0);
    itemsQuantity > 0 && (count.removeAttribute("hidden"), count.innerHTML = itemsQuantity);
} 
itemsQuantity(cart)  //Obtenemos la cantidad  de items en el carrito con la funcion anterior

cartLink.addEventListener("click", () => {  //Si no hay productos en el carrito, muestra el eror, sino redirige al carrito. En esta instancia el carrito ya esta creado si o si.
    if ( cart.length === 0) {
        Toastify({
            text: "Aun no tienes productos en el carrito 😔",
            duration: 2500,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true,
            style: {
              background: "#fa9102",
              color: "white"
            },
            onClick: function(){}
          }).showToast();       
    }else {
        window.location.href = "../cart.html"
    }
})

class itemCart {  //Creamos la clase para un nuevo producto en el carrito
    constructor(id, img, nombre, precio, cantidad, stock) {
        this.id = id;
        this.img = img;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.stock = stock;
    }
  }

  function addItem(arr, item) {  //Agregamos el producto y su detale al carrito
    arr.push(item);
}

function saveLocalStorage(arr) {  //Guardamos el carrito en LocalStorage
    localStorage.setItem(`${actualUser.userName}-cart`, JSON.stringify(arr));
}

function renderProduct (item) {  //Renderizamos el producto
    Item.innerHTML =
    `<div class="card">
        <button class="btn return" type="button" id="return"><i class="bi bi-x"></i></button>
        <div class="rowItem">
            <div class="col-md-6 imgDetailContainer">
                <img src=${item.img} class="card-img" alt="Imagen Producto">
            </div>
            <div class="col-md-6">
                <div class="description">
                    
                    <h3>${item.nombre}</h3>
                    <h3 class ="price">$ ${item.precio.toLocaleString('es-ES', { useGrouping: true})}</h3>
                    <p>Stock: ${item.stock} unidades.</p>
                    <div class="counter">
                        <div>
                            <button class="CounterButton" type="button" id="res">-</button>
                            <label for="count" id="quantity" class =" text-center">1</label>
                            <button class="CounterButton" type="button" id="sum">+</button>
                        </div>
                        <button type="submit" class="btn add" id="add">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

//Recuperamos los elementos creados
const back = document.querySelector("#return"),
sum = document.querySelector("#sum"),
res = document.querySelector("#res"),
quantity = document.querySelector("#quantity"),
add = document.querySelector("#add");

back.addEventListener("click", () => {  //Al cerral el detalle se redirige al Home
    window.location.href = "./home.html"
});

sum.addEventListener("click", () => {  //El boton sumar permite agregar 1 sin superar el stock disponible y mostrarlo al usuario
    let q = quantity.innerText;    
    q < item.stock && q++;
    quantity.innerText = q;    
});

res.addEventListener("click", () => { //El boton restar permite quitar 1 siendo el valor minimo 1 y mostrarlo al usuario
    let q = quantity.innerText;    
    q > 1 && q--;
    quantity.innerText = q;    
});

add.addEventListener("click", () => {
    const ItemFound = cart.find((itemCart) => {  //Al agregar el un producto al carrito se controla si el producto ya existe en el carrito
        return itemCart.id == item.id;
      })

    if (ItemFound) {  //Si ya esta el producto en el carrito
        let index = cart.findIndex(prod => prod.id == ItemFound.id); //recuperamos el indice
        cart[index].cantidad = quantity.innerText;  //Modificamos la cantidad pedida por la actual      
        saveLocalStorage(cart);  //Guardamos el nuevo carrito modificado
        itemsQuantity(cart);  //Actualizamos la cantidad de items en la notificacion del header
        Toastify({  //Mensaje de exito
            text: "Cantidad modificada con éxito! 🎉",
            duration: 2500,
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true,
            style: {
                cursor: "default",
                background: "#96c93d",
                color: "white"
            },
            onClick: function(){}
          }).showToast();        
        
          setTimeout(() => {
            window.location.href = "./home.html";  //Redirijimos al Home
         }, 2500); 
    }else { //Si el producto no existe en el carrito creamos uno nuevo
        const newItemCart = new itemCart(
            item.id,
            item.img,
            item.nombre,
            item.precio,
            quantity.innerText,
            item.stock
          );
        addItem(cart, newItemCart); //Agregamos el producto al carrito
        saveLocalStorage(cart);  //Guardamos el carrito actualizado
        itemsQuantity(cart); //Actualizamos la cantidad de items en la notificacion del header
        Toastify({  //Mensaje de exito
            text: "Producto agregado con éxito! 🎉",
            duration: 2500,
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true,
            style: {
              background: "#96c93d",
              cursor: "default",
              color: "white"
            },
            onClick: function(){}
          }).showToast();        
        
          setTimeout(() => {
            window.location.href = "./home.html";  //Redirijimos al Home
         }, 2500); 
    }
})
}

function loadProduct (id) {  //Funcion para buscar el producto con el ID obtenido de manera asincronica
    fetch("./bdd/products.json")
        .then((res) => res.json())
        .then(products => {
            const findProduct = products.find((el) => {
                return el.id === id;
            });
            item = findProduct; //Guardamos el producto para su uso
            renderProduct(findProduct); //Renderizamos el producto
        })
}

function loadID () {  //Funcion para obtener el ID del producto enviado desde el home
    const id = JSON.parse(localStorage.getItem("id"));
    return id;
}

const id = loadID();  //Recuperamos el ID del producto a visualizar
loadProduct(id);  //Obtenemos el producto con el ID anterior

exit.addEventListener("click", () => {  //Vaciamos el LocalStorage
    localStorage.removeItem("actualUser");
    localStorage.removeItem("id");
    cart.length == 0 && localStorage.removeItem(`${actualUser.userName}-cart`);  //Si hay carrito, queda almacenado, sino se elimina
    window.location.href = "./index.html";
})
}