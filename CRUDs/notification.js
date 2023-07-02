
const notifications = [];

module.exports = function(app){

    app.get('/notofications', function(req, res){
        res.send('notofications GET ALL');
    });

    app.get('/notofications/:id', function(req, res){
        res.send('notofications GET');
    });

    app.post('/notofications', function(req, res){
        res.send('notofications POST');
    });
    
    app.put('/notofications/:id', function(req, res){
        res.send('notofications PUT');
    });
    
    app.delete('/notofications/:id', function(req, res){
        res.send('notofications DELETE');
    });

}