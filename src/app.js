import ProductManager, { index } from "./scripts/ProductManager.js";
import express from 'express';

const app = express();
const PORT = 3000;

const DB = './src/db/products.json'
const pm = new ProductManager(DB);

app.use(express.urlencoded({extended : true}));

//Carga pequeño menu de "navegacion"
app.get('/', async (req, res) => {
    let welcome = await index();
    res.send(welcome);
})

//Carga de products.json con opcion de limitar los resultados.
app.get('/products', async (req, res) => {
    try{
        let limit = req.query.limit;

        const products = await pm.getProducts(limit);
        res.json(products);

    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Busqueda segun ID.
app.get('/products/:pid', async (req, res) => {
    try{
        let productId = parseInt(req.params.pid);

        const products = await pm.getProductById(productId);
        res.json(products);

    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Inicia el serivor
app.listen(PORT, () => {
    console.log(`Server active on http://localhost:${PORT}`);
});