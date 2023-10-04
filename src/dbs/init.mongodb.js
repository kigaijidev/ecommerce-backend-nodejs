'use strict'
const mongoose = require('mongoose')
const { countConnect, checkOverload } = require('../helper/check.connect');
const { db: { host, port, name }} = require('../configs/config.mongodb');
const connectString = `mongodb://${host}:${port}/${name}`;

class Database{
    constructor(){
        this.connect();
    }

    connect(type = 'mongodb'){
        if(1 === 1){
            mongoose.set('debug',true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect( connectString).then( _ => {
            console.log('Connected Mongodb Success PRO')
            //checkOverload();
        })
        .catch( err => console.log(`Error Connect!`));
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceDatabase = Database.getInstance();
module.exports = instanceDatabase;