FROM node
#Definimos una imagen base: NODE. Esto lo toma del Docker Hub

WORKDIR /app
#Aca estamos creando una carpeta interna donde guardar nuestro proyecto. 

COPY package.json . 
#Estamos copiando el package.json a mi nueva carpeta. 

RUN npm install 
#Tiene que ejecutarse la instalacion

COPY . . 
#Esto copia todo el codigo de mi aplicacion. 

EXPOSE 8080
#Le decimos que puerto vamos a escuchar

CMD [ "npm","start"]
#Tiene que ejecutar "npm start" para que funcione, no se olviden de configurar el script