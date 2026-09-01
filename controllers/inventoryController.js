const db = require("../db/queries");

async function all_products (req, res) {
    const products = await db.getAllproducts();
    res.send({products:products});
}

async function all_categories (req, res) {
    const rows = await db.getCategories();
    res.send({'all categories': rows});
}

async function category_get (req, res) {
    const rows = await db.category_get(req.params.category);
    res.send({category: rows});
}

async function item_get (req, res) {
    const item = await db.item_get(req.params.id);
    res.send({item: item});
}

module.exports = {
    all_products,
    all_categories,
    category_get,
    item_get
}