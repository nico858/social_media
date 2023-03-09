module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    post: {
        port: process.env.POST_PORT || 3002
    },
    jwt: {
        secret: process.env.JWT_SECRET || "notasecret!",
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'db4free.net',
        user: process.env.MYSQL_USER || 'nico858',
        password: process.env.MYSQL_PASS || 'admin123',
        database: process.env.MYSQL_DB || 'socialmediadb',       
        port: process.env.MYSQL_PORT || '3306',       
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_SRV_HOST || 'localhost',   
    },
    cacheService: {
        port: process.env.CACHE_SRV_PORT || 3003,
        host: process.env.CACHE_SRV_HOST || 'localhost',   
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-cli -u redis://default:SCeZyCOayZ9Di3ka4VtLrbS00bbVPxIS@redis-16131.c232.us-east-1-2.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || '16131',
        password: process.env.REDIS_PASS || 'SCeZyCOayZ9Di3ka4VtLrbS00bbVPxIS',
    },
}