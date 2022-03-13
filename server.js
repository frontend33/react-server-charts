var express = require("express");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var path = require("path");
var cors = require('cors');
const adapter = new FileSync('db.json')
var db = low(adapter);
var app = express();
var bodyParser = require("body-parser");
const { nanoid } = require("nanoid")
const srcPath = __dirname;
app.use(express.static(path.join(srcPath, "public")));

app.use(cors());
app.use(bodyParser.json())

var defaultDeals = {
    dealsList: [
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2015-03-15T13:03:00Z", value: 7 },
        { id: "GAXU_bL8H--qhTzDZtDsf", date: "2015-03-20T13:03:00Z", value: 8 },
        { id: "GAXU_bL9H--qhTzDZtDsf", date: "2015-03-30T13:03:00Z", value: 9 }
    ],
    isNext: true
   };

db.get("deals").defaults(defaultDeals).write()

// Send user data - used by client.js
app.get("/api/v1/deals", function(request, response, next) {
    const page = parseInt(request.query.page)
    const limit = parseInt(request.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    var deals = db.get("deals").value(); // finds all entries in the deals table

    const result = {
        dealsList: deals?.dealsList?.length ? deals.dealsList.slice(startIndex, endIndex): [],
        isNext: deals?.dealsList.length >= endIndex
    }
    response.send(JSON.stringify(result));
});

// Create a new deal
app.post('/api/v1/newDeal', (request, response) => {
    const note = request.params
    db.get("deals.dealsList")
        .push({
        ...note, id: nanoid()
    }).write()
    response.json({ success: true })
})

app.delete('/api/v1/newDeal/:id', function(request, response) {
    const id = request.params.id;
    db.get('deals.dealsList').remove({ id }).write();
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
