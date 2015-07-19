var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

mongoose.connect('mongodb://kartikey:lola123@apollo.modulusmongo.net:27017/yxo3peBy');

app.use(express.static(__dirname + '/public'));                
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

var Todo = mongoose.model('Todo', {
    text : String
});


app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if (err)
            res.send(err)

        res.json(todos);
    });
});

app.post('/api/todos', function(req, res) {
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});


app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});


app.listen(9000, function() {
    console.log("Listening at port 9000");
});
