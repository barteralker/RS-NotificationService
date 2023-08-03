
const winston = require('winston');

dateFormat = () => {
    return new Date(Date.now()).toUTCString(); 
}

class LoggerService {

    constructor(route) {

        this.traceId = '';
        this.route = route;
        
        const logger = winston.createLogger({
            transports: [
                new winston.transports.File({
                filename: `./logs/${route}.log`
                , options: { flags: 'w' } 
                })
            ],
            format: winston.format.printf((info) => {
                let message = `${dateFormat()} | ${info.level.toUpperCase()}${this.traceId !== '' ? ` | ${this.traceId}` : ``} | ${info.message}`
                message = info.obj ? message + ` | data:${JSON.stringify(info.obj)}` : message
                return message
            })
        });

        this.logger = logger;

    }

    setTraceId(traceId) {
        this.traceId = traceId;
    }

    async info(message) {
        this.logger.log('info', message);
    }

    async info(message, obj) {
        this.logger.log('info', message, {
            obj
        })
    }

    async debug(message) {
        this.logger.log('debug', message);
    }

    async debug(message, obj) {
        this.logger.log('debug', message, {
            obj
        })
    }

    async error(message) {
        this.logger.log('error', message);
    }

    async error(message, obj) {
        this.logger.log('error', message, {
            obj
        })
    }
}

module.exports = new LoggerService('logs');