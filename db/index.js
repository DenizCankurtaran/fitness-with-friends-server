const mongoose = require('mongoose');
const UserService = require('../services/UserService');
const { generate } = require('../generateWorkout');
let _db;

const initDb = () => {
    if (_db) return _db;
    let databaseUrl = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL_PRODUCTION : process.env.DATABASE_URL_DEVELOPMENT;
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }   
    mongoose.connect(databaseUrl, options);
    db = mongoose.connection;

    db.on('error', ()=>{
        console.log(`Error while connecting to DB: ${databaseUrl}`);
    });

    db.once('open', async ()=>{
        console.log(`DB initialized - connected to: ${databaseUrl}`);
        _db = db; 
        const [err, users] = await UserService.findUsers();
        if (!users || users.length === 0) {
            console.log('No existing user found. Creating superuser');
            let [err, user] = await UserService.createUser({
                username: process.env.SUPERUSER,
                password: process.env.SUPERUSER_PW,
                isAdmin: true,
            });
            generate(user);
        }
    });

};

const getDb = () => { return _db };

const closeDb = () => { mongoose.connection.close() };


module.exports = {
    initDb,
    getDb,
    closeDb
};
