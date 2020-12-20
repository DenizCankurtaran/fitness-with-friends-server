const mongoose = require('mongoose');
// const UserService = require('../services/UserService');
let _db;

const initDb = () => {
    if (_db) return _db;

    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }   
    mongoose.connect(process.env.DATABASE_URL, options);
    db = mongoose.connection;

    db.on('error', ()=>{
        console.log(`Error while connecting to DB: ${process.env.DATABASE_URL}`);
    });

    db.once('open', async ()=>{
        console.log(`DB initialized - connected to: ${process.env.DATABASE_URL}`);
        _db = db; 
        // const [err, users] = await UserService.findUsers();
        // if (!users || users.length === 0) {
        //     console.log('No existing user found. Creating superuser');
        //     UserService.createUser({
        //         username: process.env.SUPERUSER,
        //         isSeedling: true,
        //         password: process.env.SUPERUSER_PW,
        //         isAdmin: true,
        //         email: 'admin@admin.de'
        //     })
        // }
    });

};

const getDb = () => { return _db };

const closeDb = () => { mongoose.connection.close() };


module.exports = {
    initDb,
    getDb,
    closeDb
};
