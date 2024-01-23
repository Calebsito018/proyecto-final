// document.addEventListener("DOMContentLoaded", () => {
//     const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

//     addToCartButtons.forEach((button) => {
//         button.addEventListener("click", async () => {
//             const productId = button.getAttribute("data-product-id");
//             const cartId = "{{cartId}}"; // Aquí debes obtener el valor del cartId de alguna manera

//             try {
//                 console.log(`PRODUCT_ID: ${productId}`);
//                 console.log(`CART_ID: ${cartId}`);

//                 const response = await fetch(
//                     `http://localhost:8080/api/carts/${cartId}/products/${productId}`,
//                     {
//                         method: "post",
//                     }
//                 );

//                 if (response.status === 200) {
//                     console.log("Producto agregado al carrito");
//                     alert("Producto agregado al carrito");
//                 } else {
//                     console.log("Error al agregar el producto al carrito");
//                     alert("Error al agregar el producto al carrito");
//                 }
//             } catch (error) {
//                 console.error(error);
//                 alert("Error al agregar el producto al carrito");
//             }
//         });
//     });
// });
