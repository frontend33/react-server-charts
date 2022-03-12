var express = require("express");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var path = require("path");
var cors = require('cors');
// var adapter = new FileSync("/sandbox/db/database.json");
const adapter = new FileSync('db.json')
var db = low(adapter);
var app = express();
var bodyParser = require("body-parser");
const { nanoid } = require("nanoid")
const srcPath = __dirname;
app.use(express.static(path.join(srcPath, "public")));

app.use(cors());
app.use(bodyParser.json())

// Initial set of deals to the database
// var defaultDeals = { deals: [
//     { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 7 },
//     { id: "GAXU_bL8H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 8 },
//     { id: "GAXU_bL9H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 9 }
// ]};

var defaultDeals = {
    dealsList: [
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 7 },
        { id: "GAXU_bL8H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 8 },
        { id: "GAXU_bL9H--qhTzDZtDsf", date: "2022-03-12T15:16:16.090Z", value: 9 }
    ],
    isNext: true
   };

db.get("deals").defaults(defaultDeals).write()

// Send user data - used by client.js
app.get("/deals", function(request, response, next) {
    const page = parseInt(request.query.page)
    const limit = parseInt(request.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    // const results = {}

    var deals = db.get("deals").value(); // finds all entries in the deals table
    console.log(startIndex, endIndex, deals)

    const result = {
        dealsList: deals?.dealsList?.length ? deals.dealsList.slice(startIndex, endIndex): [],
        isNext: deals.length >= endIndex
    }
    response.send(JSON.stringify(result));
});

// Create a new deal
app.post('/newDeal', (request, response) => {
    const note = request.params
    db.get("deals")
        .push({
        ...note, id: nanoid()
    }).write()
    response.json({ success: true })
})

app.delete('/api/newDeal/:id', function(request, response) {
    const id = request.params.id;
    db.get('deals').remove({ id }).write();
    response.json({ success: true })
});

app.get("/", function(request, response) {
    response.sendFile(srcPath + "/public/index.html");
});

// Listen on port 8080
var listener = app.listen(8080, function() {
    console.log( srcPath + "/build/index.html")
    console.log("Listening on port " + listener.address().port);
});
