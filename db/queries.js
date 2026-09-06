//TODO: validation
//TODO: post,put,delete
const pool = require('./pool');
const ALLOWED_TABLES = [
    'category', 'subtype', 'brand', 'unit', 'product', 'storage', 'items'
];
async function getAll(table) {
    if (!ALLOWED_TABLES.includes(table)) {
        throw new Error('Unknown table '+table);
    }
    const { rows } = await pool.query(`SELECT * FROM ${table} ORDER BY name`);
    return rows;
}
// retrive all from single table
const getCategories = () => getAll('category');
const getSubtypes = () => getAll('subtype');
const getBrands = () => getAll('brand');
const getStorage = () => getAll('storage');
const getUnits = () => getAll('unit')
const getProducts = () => getAll('product');
const getItems = () => getAll('items');



// get all items
async function getAllproducts(){
    const { rows } = await pool.query(
        `SELECT
        p.name AS product,
        i.quantity,
        i.exp_date AS expiration,
        s.name AS location,
        st.name AS subtype,
        c.name AS category
        FROM items i
        JOIN product p ON p.id = i.product_id
        JOIN subtype st ON st.id = p.subtype_id
        JOIN category c ON c.id = st.category_id
        JOIN storage s ON s.id = i.storage_id
        `
    );
    return rows;
}
// all from given category
async function category_get (name) {
    const { rows } =  await pool.query(
        `SELECT
            p.name AS product,
            i.quantity,
            i.exp_date AS expiration,
            s.name AS location,
            st.name AS subtype,
            c.name AS category,
            s.name AS location
        FROM items i
        JOIN product p ON p.id = i.product_id
        JOIN subtype st ON st.id = p.subtype_id
        JOIN category c ON c.id = st.category_id
        JOIN storage s ON s.id = i.storage_id
        WHERE c.name=$1
        `, [name]);
        return rows;
}
//single item
async function item_get (id) {
    const { rows } = await pool.query(
        `SELECT
            p.name AS product,
            i.quantity,
            i.exp_date AS expiration,
            s.name AS location,
            st.name AS subtype,
            c.name AS category,
            s.name AS location
        FROM items i
        JOIN product p ON p.id = i.product_id
        JOIN subtype st ON st.id = p.subtype_id
        JOIN category c ON c.id = st.category_id
        JOIN storage s ON s.id = i.storage_id
        WHERE
            i.id=$1
        `, [id]
    );
    return rows[0];
}


module.exports = {
    getAllproducts,
    category_get,
    item_get,
    getCategories,
    getBrands,
    getSubtypes,
    getUnits,
    getStorage,
    getProducts,
    getItems
}