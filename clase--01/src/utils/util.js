import { faker } from "@faker-js/faker";

const generateProducts = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: parseInt(faker.string.numeric()),
        image: faker.image.url()
    }
}

const generateUsers = () => {

    let numeroDeProductos = parseInt(faker.string.numeric());
    const productos = [];

    for (let i = 0; i < numeroDeProductos; i++) {
        productos.push(generateProducts());
    }

    return {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        productos
    }
}

export default generateUsers; 