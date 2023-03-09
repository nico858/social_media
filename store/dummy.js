const db = {
    'user': [
        {id: '1', name: 'Nicolás'},
    ]
};

async function list(table) {
    return db[table] || [];
};

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
};

async function upsert(table, data) {
    if(!db[table]) {
        db[table] = [];
    }
    db[table].push(data);
};

async function remove(table, id) {
    const index = db[table].findIndex(item => item.id === id);
    if(index >= 0) {
        const part1 = db[table].slice(0, index);
        const part2 = db[table].slice(index + 1);
        db[table] = part1.concat(part2);
        return true;
    }
};

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
}