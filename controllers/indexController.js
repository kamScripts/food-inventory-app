const db = require('../db/queries');
const get_index = (req,res) => res.render('index');

async function get_create (req, res) {
    const [
        categories, brands, subtypes, units, storage, products
    ] = await Promise.all([
        db.getCategories(),
        db.getBrands(),
        db.getSubtypes(),
        db.getUnits(),
        db.getStorage(),
        db.getProducts()
    ]);
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