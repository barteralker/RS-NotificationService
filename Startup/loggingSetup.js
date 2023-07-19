// import { unlink } from 'node:fs';
const fs = require('fs');

module.exports = (winston) => {

    winston.add(new winston.transports.File({ filename: './logs/logs.log' , options: { flags: 'w' } }));

    process.on('uncaughtException', (exp) => {
        winston.error('UNCAUGHT EXCEPTION');
        winston.error(exp.message, exp);
    });
    
    process.on('unhandledRejection', (exp) => {
        winston.error('UNHADLED PROMISE REJECTION');
        winston.error(exp.message, exp);
    });
    
}