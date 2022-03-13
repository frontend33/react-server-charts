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
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-01T19:42:08.739Z", value: 1 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-02T19:42:08.739Z", value: 2 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-03T19:42:08.739Z", value: 3 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-04T19:42:08.739Z", value: 4 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-05T19:42:08.739Z", value: 5 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-06T19:42:08.739Z", value: 6 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-07T19:42:08.739Z", value: 7 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-08T19:42:08.739Z", value: 8 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-09T19:42:08.739Z", value: 9 },
        { id: "GAXU_bL8H--qhTzDZtDsf", date: "2022-03-10T19:42:08.739Z", value: 10 },
        { id: "GAXU_bL9H--qhTzDZtDsf", date: "2022-03-20T19:42:08.739Z", value: 11 }
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
    const note = request.body
    db.get("deals.dealsList")
        .push({
        ...note, id: nanoid()
    }).write()
    response.json({ success: true })
})

// Delete deal by id
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
