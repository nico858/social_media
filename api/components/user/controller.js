const nanoid = require('nanoid');

const auth = require('../auth');

const TABLA = 'user';



module.exports = function(injectedStore, injectedCache) {
    let store = injectedStore;
    let cache = injectedCache;
    if (!store) {
        store = require('../../../store/dummy');
    }
    if(!cache) {
        cache = require('../../../store/dummy');
    }

    return {
        list: async () => {
            let users = await cache.list(TABLA);

            if(!users) {
                users = await store.list(TABLA);
                cache.upsert(TABLA, users);
            } else {
                console.log('Datos sacados de cache');
            }
            
            return users;        
        },  
        get: (id) => store.get(TABLA, id),
        upsert: async (body) => {
            const user = {
                name: body.name,
                username: body.username,
            }
            if(body.id) {
                user.id = body.id;
            } else {
                user.id = nanoid();
            }
            if(body.password || body.username) {
                await auth.upsert({
                    id: user.id,
                    username: user.username,
                    password: body.password,
                })
            }
            return store.upsert(TABLA, user);
        },
        remove: (id) => store.remove(TABLA, id),
        follow: (from, to) => {
            return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        })},
        following: (user) => {
            const join = {};
            join[TABLA] = 'user_to';
            const query = { user_from: user };
            return store.query(TABLA + '_follow', query, join);
        }
    }; 
}