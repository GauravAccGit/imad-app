var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;

var config = {
    user: 'enggupta26',
    database: 'enggupta26',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate=`
      <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>${heading}</h3>
                
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}    
                </div>
            </div>
        </body>
    </html>  
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
  var hashed = crypto.pbkdf2Sync(input, salt, 10000, 32, 'sha512');
  return ["pbkdf2", salt, "10000", hashed.toString('hex')].join('$$');
}

app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'this-is-a-random-string');
    res.send(hashedString);
});

var pool = new Pool(config);

app.get('/test-db', function(req, res) {
    //make a select request
    //send a response with results
    pool.query('SELECT * FROM testdb', function(err, result) {
       if(err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

var counter = 0;
app.get('/counter', function(req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];

app.get('/submit-name', function(req, res) {
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
    //This /: is a facility given by express framework to extract the 'part of path' as a variable from URL
    //such that it can be indexed directly into an array of strings!!
    var articleName = req.params.articleName;
    //make a select request
    //send a response with results
    pool.query("SELECT * FROM articles WHERE title = $1", [articleName], function(err, result) {
       if(err) {
           res.status(500).send(err.toString());
       } else {
           if(result.rows.length === 0) {
                res.status(400).send('Article Not found');               
           } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
           }
       }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
