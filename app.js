require('dotenv').config();
const express = require('express');
const inventoryRouter = require('./routes/inventoryRoutes');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render('index');
})

app.use('/inventory', inventoryRouter);

app.use((req, res)=>{
    res.status(404).render('404');
})

app.listen(process.env.PORT);