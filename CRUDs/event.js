
module.exports = function(app){

    app.get('/events', function(req, res){
        res.send('events GET ALL');
    });

    app.get('/events/:id', function(req, res){
        res.send('events GET');
    });

    app.post('/events', function(req, res){
        res.send('events POST');
    });
    
    app.put('/events/:id', function(req, res){
        res.send('events PUT');
    });
    
    app.delete('/events/:id', function(req, res){
        res.send('events DELETE');
    });

}