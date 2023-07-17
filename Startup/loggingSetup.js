
module.exports = (winston) => {

    winston.add(new winston.transports.File({ filename: './logs/logs.log' }));

    process.on('uncaughtException', (exp) => {
        winston.error('UNCAUGHT EXCEPTION');
        winston.error(exp.message, exp);
    });
    
    process.on('unhandledRejection', (exp) => {
        winston.error('UNHADLED PROMISE REJECTION');
        winston.error(exp.message, exp);
    });
    
}