
function all_products (req, res) {
    res.send('all products');
}

function all_categories (req, res) {
    res.send('all categories');
}

function category_get (req, res) {
    res.send('category: ' + req.params.category);
}

function item_get (req, res) {
    res.send('item: ' + req.params.id);
}

module.exports = {
    all_products,
    all_categories,
    category_get,
    item_get
}