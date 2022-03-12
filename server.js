// const express = require("express");
// const low = require("lowdb");
// const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync('db.json')
// const db = low(adapter)
//
// const defaultData = {
//     posts: [
//         {
//             id: 0,
//             authorId: 0,
//             text: 'This is first posts'
//         }
//     ],
//     authors: [
//         {
//             id: 0,
//             name: "Dennis"
//         }
//     ]
// }
//
// db.defaults(defaultData).write()
//
// const app = express();
// app.listen(3000, function (){
//     console.log('port 3000')
// })
//
// app.get('/api/v1/chartsData', (req, res) => {
//     res.send('Hello World');
// })
//
// app.post('/api/v1/chartsData', (req, res) => {
//     const posts = db.get("posts").value()
//     res.send(posts);
// })

// init project
var express = require("express");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var path = require("path");
var cors = require('cors');
// Data is stored in the file `database.json` in the folder `db`.
// Note that if you leave your app public, this database file will be copied if
// someone forks your app. So don't use it to store sensitive information.
// var adapter = new FileSync("/sandbox/db/database.json");
const adapter = new FileSync('db.json')
var db = low(adapter);
var app = express();
var bodyParser = require("body-parser");
const { nanoid } = require("nanoid")
const srcPath = __dirname;
// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(srcPath, "public")));

app.use(cors());
app.use(bodyParser.json())
// Use bodyParser to parse application/x-www-form-urlencoded form data
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Initial set of deals to populate the database with
var defaultdeals = [
    { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 7 },
    { id: "GAXU_bL8H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 8 },
    { id: "GAXU_bL9H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 9 }
];
// Clear the databaase
db.get("deals")
    .remove()
    .write();
// Put defualt deals in the deals list
defaultdeals.forEach(function(user) {
    db.get("deals")
        .push({ name: user.name })
        .write();
});

// Send user data - used by client.js
app.get("/deals", function(request, response) {
    var deals = db.get("deals").value(); // finds all entries in the deals table
    response.send(deals); // sends deals back to the page
});

// Create a new deal
app.post('/newDeal', (request, response) => {
    const note = request.body
    db.get("deals")
        .push({
        ...note, id: nanoid()
    }).write()
    response.json({ success: true })
})

// Empties the database and re-populates deals with the default deals
app.get("/reset", function(request, response) {
    // Clear the databaase
    db.get("deals")
        .remove()
        .write();
    // Set the database up again
    defaultdeals.forEach(function(user) {
        db.get("deals")
            .push({ name: user.name })
            .write();
    });
    response.redirect("/");
});

// Serve the root url: http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
    response.sendFile(path.join(srcPath, "views", "index.html"));
});

// Listen on port 8080
var listener = app.listen(8080, function() {
    console.log("Listening on port " + listener.address().port);
});
