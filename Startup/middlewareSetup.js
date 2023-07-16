
module.exports = (app) => {
    
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Welcome to Notification Service');
    })
    
    app.use('/applications', application);
    app.use('/events', event);
    app.use('/notifications', notification);
    app.use('/messages', message);
    
    app.use(errorHandler);
    
}