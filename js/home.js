const inputSearch = document.querySelector("#productSearch"),
    exit = document.querySelector("#exit"),
    productsList = document.getElementById("list"),
    cartLink = document.querySelector("#cart"),
    count =document.querySelector("#count"),
    footer = document.querySelector("#footer");


let actualUser = JSON.parse(localStorage.getItem("actualUser"));  //Recuperamos los datos del usuario actual

if (!actualUser) {
    productsList.innerHTML = `<h2 class = "text-center">No estas logueado.</h2><a href="./index.html" class="logIn"><h2 class = "text-center">Loguearse</h2></<a>`;
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


let cart = JSON.parse(localStorage.getItem(`${actualUser.userName}-cart`));  //Recuperamos el carrito del usuario actual, sino creamos un carrito vacio

if (cart) {  //Si hay carrito, obtenemos la cantidad total de items para mostrar la notificacion en el header, sino no se muestra nada.
const itemsQuantity = cart.reduce((acc, prod) => {
        return acc += parseInt(prod.cantidad);
}, 0);
itemsQuantity > 0 && (count.removeAttribute("hidden"), count.innerHTML = itemsQuantity);
}


function renderProducts (arr) {  //Renderizamos todos los productos que lleguen en un array de objetos
    productsList.innerHTML = "";
    for (const product of arr) {
        let div = document.createElement("div");    
        div.innerHTML =
        `<div class="card" id="${product.id}">
            <img src=${product.img} alt=${product.id} class="card-img-top img-product">
            <div>
                <h6>${product.nombre}</h6>
                <div class = "d-flex align-items-center justify-content-between itemFooter">
                    <h5>$ ${product.precio.toLocaleString('es-ES', { useGrouping: true})}</h5>  
                </div>   
            </div>
        </div>`
        div.classList =  "col-6 col-md-5 col-lg-4 col-xl-3";
        productsList.appendChild(div);
    }
    const viewItem = [...document.getElementsByClassName("card")];  //Recuperamos todas las cards que se cargaron
    viewItem.forEach((el) => {  //Por cada card se genera un evento click, el que almacena en LocalStorage el ID del producto y redirige al detalle del producto
    el.addEventListener('click', () => {
      localStorage.setItem("id", el.id);
      window.location.href = "./itemDetail.html";
    });
  });
}

function searchProducts (arr, filter) {  //Funcion para filtrar en base a un array de productos y un filtro que se aplica en el nombre del producto
    const filterProducts = arr.filter((el) => {
        return el.nombre.toLowerCase().includes(filter);
    });
    return filterProducts;
}

function loadProducts(filter){  //Carga asincronica de todos los productos o de productos filtrarlos
    if( filter ==="" ) {
        fetch("./bdd/products.json")
        .then((res) => res.json())
        .then(products => {
            renderProducts(products);
        })
    }else {
        fetch("./bdd/products.json")
        .then((res) => res.json())
        .then(products => {
            const filterProducts = products.filter((el) => {
                return el.nombre.toLowerCase().includes(filter);
            });
            filterProducts.length > 0 ? (renderProducts(filterProducts, footer.style.display = 'block')) : (footer.style.display = 'none', productsList.innerHTML = `<h2 class = "text-center">No se encontraron productos.</h2>`);
        })
    }
}
loadProducts("");

cartLink.addEventListener("click", () => {  //Si no hay productos en el carrito, muestra el eror, sino redirige al carrito
    if (!cart || cart.length === 0) {
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

inputSearch.addEventListener("input", () => {  //Capturamos lo que ingresa el usuario para hacer el filtro asincronico
    loadProducts(inputSearch.value.toLowerCase())
});

exit.addEventListener("click", () => {  //Vaciamos el LocalStorage
    localStorage.removeItem("actualUser");
    localStorage.removeItem("id");
    cart.length == 0 && localStorage.removeItem(`${actualUser.userName}-cart`);  //Si hay carrito, queda almacenado, sino se elimina
    window.location.href = "./index.html";
})
}