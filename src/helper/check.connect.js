'use strict'

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 500;

const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections::${numConnection}`);
}

const checkOverload = () => {
    setInterval( () => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnections = numCores * 5;
        
        
        countConnect();
        console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);

        if(numConnection > (maxConnections - 10)){
            console.log('Connection overload detected!');
        }
    }, _SECONDS);
}

module.exports = {
    countConnect,
    checkOverload,
}