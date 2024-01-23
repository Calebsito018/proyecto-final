import {fakerES_MX as faker} from "@faker-js/faker"

export const generateUser = ()=>{
    const products = []
    for (let i=0;i<5;i++){
        const product = generateProduct()
        products.push(product)
    }
    const user ={
        id: faker.database.mongodbObjectId(),
        first_name:faker.person.firstName(),
        last_name:faker.person.lastName(),
        email:faker.internet.email(),
        age:faker.number.int({ min: 18, max: 65 }),
        // phone: faker.phone.number(),
        password: "",
        cart: products,
        role: "user",
    };
    return user

}

export const generateProduct = ()=>{
    const product ={
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 90, max: 2000 }),
        stock:faker.number.int({ min: 2, max: 30 }),
        code:faker.string.alpha(6),
        // category:faker.commerce.product(),
        category: faker.commerce.department(),
        status:faker.datatype.boolean(0.9),
        // quantity:
    };
    return product
}