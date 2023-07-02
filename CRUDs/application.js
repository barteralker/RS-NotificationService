
const applications = [];

module.exports = function(app){

    app.get('/applications', function(req, res){
        res.send(applications);
    });

    app.get('/applications/:id', function(req, res){
        res.send('Applications GET');
    });

    app.post('/applications', function(req, res){
        res.send('Applications POST');
    });
    
    app.put('/applications/:id', function(req, res){
        res.send('Applications PUT');
    });
    
    app.delete('/applications/:id', function(req, res){
        res.send('Applications DELETE');
    });

}
