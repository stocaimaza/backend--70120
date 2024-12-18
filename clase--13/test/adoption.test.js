import supertest from "supertest";
import chai from "chai"; 

const expect = chai.expect; 
const requester = supertest("http://localhost:8080"); 

describe("Router de Adopciones", () => {
    describe("GET /api/adoptions", () => {
        it("Me deberia retornar una lista de adopciones", async () => {
            const {status} = await requester.get("/api/adoptions"); 

            expect(status).to.equal(200); 
        })

        it("Me retorna 404 si la ruta no existe", async () => {
            const {status} = await requester.get("/adoptions/noexiste");
            expect(status).to.equal(404); 
        })

        it("Buscamos que me retorne la info de una adopción existente", async () => {
            let aid = "67626d05a3f6fa3a7145f728"; 

            const {status} = await requester.get(`/api/adoptions/${aid}`); 
            expect(status).to.equal(200); 
        })

        it("Nos deberia retornar 404 si la adopcion no existe", async () => {
            let noExisteAid = "67626d05a3f6fa3a7145f729"; 
            const {status} = await requester.get(`/api/adoptions/${noExisteAid}`); 

            expect(status).to.equal(404);
        })

        it("Vamos a crear una adopción", async () => {
            "/:uid/:pid"

            let uid = "6748fc9f1cc87eda9209d06a";
            let pid = "674f8c6f72cc8bec558f7761";

            const {status} = await requester.post(`/api/adoptions/${uid}/${pid}`);

            expect(status).to.equal(200);

            //Traten de agregar mas validaciones y un caso de error para la ruta crear adopciones. 
        })
    })
})