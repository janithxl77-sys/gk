document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    loadShopImage();
});

const form = document.getElementById("productForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = function () {
            const product = {
                id: Date.now(),
                name: document.getElementById("name").value,
                size: document.getElementById("size").value,
                vehicles: document.getElementById("vehicles").value,
                price: document.getElementById("price").value,
                stock: document.getElementById("stock").value,
                image: reader.result
            };

            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));

            alert("Product added successfully!");
            form.reset();
        };

        reader.readAsDataURL(document.getElementById("image").files[0]);
    });
}

function displayProducts() {
    const productList = document.getElementById("productList");
    if (!productList) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];
    productList.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>Size:</strong> ${product.size}</p>
            <p><strong>Vehicles:</strong> ${product.vehicles}</p>
            <p><strong>Price:</strong> LKR ${product.price}</p>
            <p><strong>Status:</strong> ${product.stock}</p>
        `;
        productList.appendChild(card);
    });
}

const shopImageInput = document.getElementById("shopImageInput");
if (shopImageInput) {
    shopImageInput.addEventListener("change", function () {
        const reader = new FileReader();
        reader.onload = function () {
            localStorage.setItem("shopImage", reader.result);
            alert("Shop image updated!");
        };
        reader.readAsDataURL(this.files[0]);
    });
}

function loadShopImage() {
    const shopImage = document.getElementById("shopImage");
    if (!shopImage) return;

    const savedImage = localStorage.getItem("shopImage");
    if (savedImage) {
        shopImage.src = savedImage;
    }
}
