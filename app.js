const express = require("express");
const mongoose = require('mongoose');
const foodRoute = require('./routes/admin-routes');

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger/swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

const app = express();
app.use(express.json()) 
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
    next();
 }) 

app.use('/api', foodRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
})
// url de la app http://localhost:8080/api-docs/#/
// la mia mongodb+srv://lfmunoz588:BzgLx62FVVSHh5WJ@cluster0.7cqfpaw.mongodb.net/test"
// aqui ponemos la url demongo db-> mongodb+srv://adminuser:adminuser@cluster0.ecetk.gcp.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://lfmunoz588:<password>@cluster0.7cqfpaw.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://lfmunoz588:7C6T5FQVjnuzUJr2@cluster0.7cqfpaw.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true }
).then(result =>{
    app.listen(process.env.PORT || 8080); 
}).catch(err =>{
    console.log(err)
})

