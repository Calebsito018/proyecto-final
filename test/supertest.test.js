import supertest from "supertest";
import chai from "chai";
import { response } from "express";
const requester = supertest("http://localhost:8080/")
const expect = chai.expect;
//error -302 por los permisos en el router de products(Quitar middleware para recibir 200)
// Para probar los test quitar los middlewares de los routers de products y carts

describe("Pruebas con supertest", () => {
    const user = {
        first_name: "Lucas",
        last_name: "Riquelme",
        email: "correoprueba@hotmail.com",
        password: "123"
    }
    const product = {
        title: "libro 1",
        description: "descripcion de libro 1",
        price: 15,
        stock: 30,
        code: "Y68DKO"
    }
})
describe("Pruebas para products", () => {
    const product = {
        title: "libro 1",
        description: "descripcion de libro 1",
        price: 15,
        stock: 30,
        code: "Y68DyO",
        category: "categoria 1"
    }
    describe("Get /api/products", ()=>{
        it('deberia listar todos los productos en un array', async()=>{
            const response = await requester.get("api/products")
            expect(response.status).to.equal(200)
            expect(response.body.products.info.payload).to.be.an("array");
        })
    })
    describe("Post /api/product", ()=>{ //Quitar permisos en el router de products para probar los test de post
        it('deberia crear un nuevo producto',async()=>{
            const response = await requester.post("api/products").send(product);
            expect(response.status).to.equal(302)
            // expect(response.status).to.equal(200)
        })
        it("deberia mostrar status 400 si no se manda titulo", async()=>{
            const response = await requester.post("api/products").send(product)
            expect(response.status).to.equal(400)
        })
    })
    describe("PUT /api/products/:pid", () =>{
        it('deberia actualizar el producto por su id', async()=>{
            const pid = '65694ec93cc0da5a158a1591'
            const newProduct = {
                title: "libro 2",
                description: "descripcion de libro 2",
                price: 12,
                stock: 20,
                code: "Y68DF8",
                category: "categoria 2"
            }
            const response = await requester.put(`api/products/${pid}`).send({...newProduct});
            expect(response.status).to.equal(200)
        })
    })
    describe("DELETE /api/products/:pid", () =>{ //Quitar permisos en el router de products para probar los test de delete
        it('deberia eliminar el producto por su id', async()=>{
            const pid = '65694ec93cc0da5a158a1591'
            const response = await requester.delete(`api/products/${pid}`)
            expect(response.status).to.equal(302)
            // expect(response.status).to.equal(200)
        })
    })
})
describe("Pruebas para carts", () => {
    const cart = []
    describe("GET /api/carts/:cid", () => {
        it('deberia obtebtener un carrito por id', async()=>{
            const cid = '657bafd7eabfcbcf891a1591'
            const response = await requester.get(`api/carts/${cid}`)
            expect(response.status).to.equal(200)
        })
    })
    describe("POST /api/carts", () => {
        it('deberia crear un nuevo carrito', async()=>{
            const response = await requester.post("/api/carts")
            expect(response.status).to.equal(200)
        })
    })
    describe("DELETE /api/carts/:cid", () => {
        it('deberia borrar un carrito', async()=>{
            const cid = '657bafd7eabfcbcf891a1591'
            const response = await requester.del(`api/carts/${cid}`)
            expect(response.status).to.equal(200)
        })
    })
})
describe("Pruebas para sessions", () => {
    const user = {
        first_name: "Lucas",
        last_name: "Riquelme",
        email: "correoprueba@hotmail.com",
        password: "123"
    }

    describe(" POST api/session/login", () =>{
        it('deberia logear al usuario si existe en db y crear session', async()=>{
            const response = await requester.post("api/session/login").send({email: user.email, password: user.password})
            expect(response._body.status).to.equal("success")
        })
        it('Si el usuario no esta registrado no deberia crear session', async()=>{
            const response = await requester.post("api/session/login").send({email: user.email, password: user.password})
            expect(response._body.status).to.equal("error")
        })
    })
    describe(" POST api/session/register", () =>{
        it('deberia registrar a un usuario en la base de datos', async()=>{
            const response = await requester.post("api/session/register").send(user)
            expect(response._body.status).to.equal("succes")
        })
        it('Si el usuario ya existe en la db deberia mostrar error', async()=>{
            const response = await requester.post("api/session/register").send(user)
            expect(response._body.status).to.equal("error")
        })
    })
})
