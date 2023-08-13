const production = {
    PORT : 3000,
    DB : {
        host : "localhost",
        port : 3306,
        user : 'bnbsso',
        password : 'bnbsso1234',
        database : 'bnb_sso_api'
    },
    REDIS : {
        host : 'localhost',
        port : 6379
    },
    JWT: {
      option : {
        algorithm : 'HS256',
        issuer: "op_instinct"
      },
      SECRET: 'd51530ff-39f0-455b-8874-e7eb61fcd955'
    }
}

const development = {
    PORT : 20200,
    DB : {
        host : "localhost",
        port : 3306,
        user : 'bnbsso',
        password : 'bnbsso1234',
        database : 'bnb_sso_api'
    },
    REDIS : {
        host : 'localhost',
        port : 6379
    },
    JWT: {
      option : {
        algorithm : 'HS256',
        issuer: "op_instinct"
      },
      SECRET: 'd51530ff-39f0-455b-8874-e7eb61fcd955'
    }
}

module.exports = process.env.NODE_ENV !== 'production' ? development : production;