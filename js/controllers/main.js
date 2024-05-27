import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function crearCard(nombre, precio, imagen, id){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${imagen}" alt="${nombre}">
        </div>

        <div class="card-container--info">
            <p>${nombre}</p>
            <div class="card-container--value">
                <p>$ ${precio}</p>
                <div class="delete-button" data-id="${id}">
                    <img src="./assets/ico-eliminar.png" alt="Eliminar">
                </div>
            </div>
        </div>
    `;

    const eliminarCard = card.querySelector(".delete-button");
    eliminarCard.addEventListener("click", () => {
        servicesProducts.eliminarProducto(id)
            .then(() => {
                card.remove();
            })
            .catch(err => console.log(err));
    });

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try{
        const listarProductos = await servicesProducts.listaProducto();

        listarProductos.forEach((product) => {
            productContainer.appendChild(
                crearCard(product.nombre,product.precio,product.imagen,product.id)
            )
        });

    } catch (error){
        console.log(error);
    }
};

form.addEventListener("submit", () => {
    //event.preventDefault();

    const nombre = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-price]").value;
    const imagen = document.querySelector("[data-image]").value;

    servicesProducts
        .crearProducto(nombre, precio, imagen)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    
});

form.addEventListener("reset", (event)=> {
    event.preventDefault();

    document.querySelector("[data-name]").value = "";
    document.querySelector("[data-price]").value = "";
    document.querySelector("[data-image]").value = "";

    return;
});


render();
