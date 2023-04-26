const inputSearch = document.querySelector("#productSearch"),
    productsList = document.getElementById("list"),
    footer = document.querySelector("#footer");
    products = [
    {
        id: 1,
        nombre: "Notebook Dell G5 Nvidia Geforce Gtx 1650 Intel Core I5 Gamer",
        precio: 749.999,
        stock: 12,
        img: "https://statics.avenida.com/avenida/products/photos/0d/b79/bed6118b79fced515df40d95506fa984_l.jpeg"
    },
    {
        id: 2,
        nombre: "Celular Motorola Moto Edge30 Fusion Xt2243-1+ct",
        precio: 34.999,
        stock: 20,
        img: "https://statics.avenida.com/avenida/products/photos/f5/bbb/5df6651bbbcda068f05df5730a1a0968_l."
    },
    {
        id: 3,
        nombre: "Smart Tv TCL 65'' Led UHD Google Tv",
        precio: 188.999,
        stock: 15,
        img: "https://statics.avenida.com/avenida/products/photos/76/28f/6ff831728f5382110dba761b33f91590_l."
    },
    {
        id: 4,
        nombre: "Parlante Portátil JBL Flip 6 Gris",
        precio: 58.499,
        stock: 32,
        img: "https://statics.avenida.com/avenida/products/photos/34/94f/051632394fd542afc51334063fa35c72_l."
    },
    {
        id: 5,
        nombre: "Barra De Sonido Samsung Hw-t420 2.1Ch",
        precio: 93.749,
        stock: 7,
        img: "https://statics.avenida.com/avenida/products/photos/b8/5d0/de337d85d09d1038e182b8c6622c2f90_l.png"
    },
    {
        id: 6,
        nombre: "Parlante Portatil Philips Tas2505w00 3W Con Bluetooth",
        precio: 11.999,
        stock: 20,
        img: "https://statics.avenida.com/avenida/products/photos/38/322/b3bb419322a8e28deb8238fcd70230ec_l."
    },
    {
        id: 7,
        nombre: "Celular Samsung Galaxy A33 128Gb Negro",
        precio: 141.999,
        stock: 9,
        img: "https://statics.avenida.com/avenida/products/photos/a3/3ac/7a8bff93ac2088cddfdca31da7101186_l."
    },
    {
        id: 8,
        nombre: "Smart Tv Samsung 70'' Au7000 Uhd 4K Serie",
        precio: 399.999,
        stock: 11,
        img: "https://statics.avenida.com/avenida/products/photos/99/474/e5f9205474f321513ab099da2332e137_l."
    },
    {
        id: 9,
        nombre: "Parlante JBL Quantum Duo Para Gaming",
        precio: 74.999,
        stock: 21,
        img: "https://statics.avenida.com/avenida/products/photos/10/283/d5501c728327d4883cfe100c6f41a0dd_l."
    },
    {
        id: 10,
        nombre: "Notebook Acer Aspire 5 A515-54-77je I7 8Gb Ram 512Gb Ssd Win 11",
        precio: 542.999,
        stock: 18,
        img: "https://statics.avenida.com/avenida/products/photos/3e/241/db0f45224198e2d449383ea6b45f1b15_l."
    },
    {
        id: 11,
        nombre: "Celular Samsung Galaxy A53 5G 128/6Gb Black",
        precio: 163.999,
        stock: 30,
        img: "https://statics.avenida.com/avenida/products/photos/63/b5c/6b3f68ab5c3c4f67dafc63e1b0ca2896_l.jpg"
    },
    {
        id: 12,
        nombre: "Notebook Acer Aspire 5 A515-54-77je I7 8Gb Ram 512Gb Ssd Win 11",
        precio: 529.999,
        stock: 13,
        img: "https://statics.avenida.com/avenida/products/photos/3e/241/db0f45224198e2d449383ea6b45f1b15_l."
    }
]

function saveProductsLocalStorage(arr) {
    localStorage.setItem("products", JSON.stringify(arr));
}
saveProductsLocalStorage(products);
const cart = JSON.parse(localStorage.getItem("cart")) || [];
localStorage.setItem("cart", JSON.stringify(cart));

function renderProducts (arr) {
    productsList.innerHTML = "";
    for (const product of arr) {
        let div = document.createElement("div");    
        div.innerHTML =
        `<div class="card" id="${product.id}">
            <img src=${product.img} alt=${product.id} class="card-img-top img-product">
            <div>
                <h6>${product.nombre}</h6>
                <div class = "d-flex align-items-center justify-content-between itemFooter">
                    <h5>$ ${product.precio}</h5>  
                    <button type="submit" class="btn viewItem" id="${product.id}">Ver</button>
                </div>   
            </div>
        </div>`
        div.classList =  "col-6 col-md-5 col-lg-4 col-xl-3"   
        productsList.appendChild(div);
    }
}

renderProducts(products);

const viewItem = [...document.getElementsByClassName("card")];

viewItem.forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.id;
      localStorage.setItem("id", id);
      window.location.href = "./itemDetail.html";
    });
  });

function searchProducts (arr, filter) {
    const filterProducts = arr.filter((el) => {
        return el.nombre.toLowerCase().includes(filter);
    });
    return filterProducts;
}

inputSearch.addEventListener("input", () => {
    let filterProducts = searchProducts(products, inputSearch.value.toLowerCase())
    filterProducts.length > 0 ? (renderProducts(filterProducts, footer.style.display = 'block')) : (footer.style.display = 'none', productsList.innerHTML = `<h2 class = "text-center">No se encontraron productos.</h2>`);    
});