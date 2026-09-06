const db = require('../db/queries');
const get_index = (req,res) => res.render('index');

async function get_create (req, res) {
    const categories = await db.getCategories();
    const brands = await db.getBrands();
    const subtypes = await db.getSubtypes();
    const units = await db.getUnits();
    const storage = await db.getStorage();
    const products = await db.getProducts();
    res.render('create', {
        categories,
        subtypes,
        brands,
        units,
        storage,
        products
    });
}
module.exports = {
    get_index,
    get_create
}