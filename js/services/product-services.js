//const apiUrl = "http://localhost:3000/products";
const apiUrl = "https://alura-geek-api-three.vercel.app/products";

const listaProducto = () => {
    return fetch(apiUrl)
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const crearProducto = (nombre, precio, imagen) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({nombre ,precio, imagen,}),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const eliminarProducto = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const servicesProducts = {
    listaProducto,
    crearProducto,
    eliminarProducto
};
