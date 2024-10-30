//Integramos MercadoPago del lado del cliente: 

const mp = new MercadoPago("APP_USR-5c9274cb-5294-4368-84ef-415f1ca11d4b", {
    locale: "es-AR"
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
        //Pasamos los datos de la compra: 

        const orderData = {
            title: "Patito",
            quantity: 1,
            price: 100
        }

        const response = await fetch("http://localhost:8080/create-preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const preference = await response.json();
        createCheckoutButton(preference.id);

    } catch (error) {
        alert("Error fatal, terrible, tenias tantas carreras la elegir pero te decidiste por la que no tenes ningun talento. ")
    }
})

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        //Correccion para evitar que se dupliquen los botones: 
        if (window.checkoutButton) window.checkoutButton.unmount();
        //Si ya existe el boton, desmontalo. 
        await bricksBuilder.create("wallet", "wallet-container", {
            initialization: {
                preferenceId: preferenceId
            }
        })
    }
    renderComponent();
}