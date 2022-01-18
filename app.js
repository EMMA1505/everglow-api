const express = require('express');
const router = express.Router();
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(router);

app.use(cors());

const serviceRouter = require('./routers/services');
app.use(serviceRouter);

app.listen(port, ()=>{
    console.log(`Escuchando el puerto ${port}`);
});

