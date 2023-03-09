
const TABLA = 'post';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    return {
        list: () => store.list(TABLA),
        get: (id) => store.get(TABLA, id),
        upsert: (body) => {
            const post = {
                id: body.id,
                user: body.user,
                text: body.text,
            }
            return store.upsert(TABLA, post);
        },
        getByUser: (user) => {
            const query = { user: user };
            return store.query(TABLA, query);
        },
    }
}