import supertest from "supertest";
import expect from "chai";
const requester = supertest("http://localhost:8080")

// describe("Pruebas con supertest", () => {
//     const user = {
//         first_name: "Miguel",
//         last_name: "Torres",
//         email: "migueltoar17@hotmail.com",
//         password: "123"
//     }
//     const product = {
//         title: "libro 1",
//         description: "descripcion de libro 1",
//         price: 15,
//         stock: 30,
//         code: "Y68DKO"
//     }
// })
describe("Pruebas para products", () => {
    const product = {
        title: "libro 1",
        description: "descripcion de libro 1",
        price: 15,
        stock: 30,
        code: "Y68DKO"
    }

    it("1 GET /api/products", async () => {
        const response = await requester.get("/api/products");
        console.log(response);
    })
})
// describe("Pruebas para carts", () => { })
// describe("Pruebas para sessions", () => { })
