const div = document.querySelector("#item"),
products = JSON.parse(localStorage.getItem("products"));

function loadUser () {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}
const user = loadUser();

let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

class itemCart {
    constructor(id, nombre, precio, cantidad) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cantidad;
    }
  }

function renderProduct (item) {
    div.innerHTML =
    `<div class="card">
        <button class="btn return" type="button" id="return"><i class="bi bi-x"></i></button>
        <div class="rowItem">
            <div class="col-md-6 imgDetailContainer">
                <img src=${item.img} class="card-img" alt="Imagen Producto">
            </div>
            <div class="col-md-6">
                <div class="description">
                    
                    <h4>${item.nombre} </h4>
                    <h4 class ="price">$ ${item.precio}</h4>
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
}

function loadID () {
    const id = JSON.parse(localStorage.getItem("id"));
    return id;
}

function searchProduct (arr, id) {
    const findProduct = arr.find((el) => {
        return el.id == id;
    });
    return findProduct;
}

function addItem(arr, item) {
    return arr.push(item);
}

function saveLocalStorage(arr) {
    return localStorage.setItem("cart", JSON.stringify(arr));
}

const id = loadID();
const item = searchProduct(products, id);
renderProduct(item);

const back = document.querySelector("#return"),
sum = document.querySelector("#sum"),
res = document.querySelector("#res"),
quantity = document.querySelector("#quantity"),
add = document.querySelector("#add");

back.addEventListener("click", () => {
    window.location.href = "./home.html"
});

sum.addEventListener("click", () => {
    let q = quantity.innerText;    
    q < item.stock ? q++ :  "";
    quantity.innerText = q;    
});

res.addEventListener("click", () => {
    let q = quantity.innerText;    
    q > 1 ? q-- :  "";
    quantity.innerText = q;    
});

add.addEventListener("click", () => {
    const ItemFound = cartLocalStorage.find((itemCart) => {
        return itemCart.id == item.id;
      })

    if (ItemFound) {
        let index = cartLocalStorage.findIndex(prod => prod.id == ItemFound.id);
        aux = [...cartLocalStorage];
        aux[index].cantidad = quantity.innerText;
        saveLocalStorage(aux);
    }else {
        const newItemCart = new itemCart(
            item.id,
            item.nombre,
            item.precio,
            quantity.innerText
          );
        addItem(cartLocalStorage, newItemCart);
        saveLocalStorage(cartLocalStorage);
    }
})