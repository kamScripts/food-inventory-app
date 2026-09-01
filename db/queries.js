//TODO: validation
//TODO: post,put,delete
const pool = require('./pool');

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

async function getCategories() {
    const { rows } = await pool.query('SELECT * FROM category');
    return rows;
}

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
    getCategories,
    category_get,
    item_get
}