const express = require('express');
const app = express();
const fs = require('fs');


app.use(express.static(__dirname));

app.get('/', function(req, res){
    fs.readFile(__dirname + '/metamask_impl.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.listen(3000, function(){
    console.log("port 3000");
});
