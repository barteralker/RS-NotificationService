
module.exports = function(app){

    app.get('/messages', function(req, res){
        res.send('messages GET ALL');
    });

    app.get('/messages/:id', function(req, res){
        res.send('messages GET');
    });

    app.post('/messages', function(req, res){
        res.send('messages POST');
    });
    
    app.put('/messages/:id', function(req, res){
        res.send('messages PUT');
    });
    
    app.delete('/messages/:id', function(req, res){
        res.send('messages DELETE');
    });

}