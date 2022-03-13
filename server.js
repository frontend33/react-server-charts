let express = require("express");
let low = require("lowdb");
let FileSync = require("lowdb/adapters/FileSync");
let path = require("path");
let cors = require('cors');
const adapter = new FileSync('db.json')
let db = low(adapter);
let app = express();
let bodyParser = require("body-parser");
const { nanoid } = require("nanoid")
const srcPath = __dirname;
app.use(express.static(path.join(srcPath, "public")));

app.use(cors());
app.use(bodyParser.json())

let defaultDeals = {
    dealsList: [
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-01T19:32:08.739Z", value: 1 },
        { id: "GAXU_bL1H--qhTzDZtDsf", date: "2022-03-02T19:33:08.739Z", value: 5 },
        { id: "GAXU_bL2H--qhTzDZtDsf", date: "2022-03-03T19:34:08.739Z", value: 10 },
        { id: "GAXU_bL3H--qhTzDZtDsf", date: "2022-03-04T19:35:08.739Z", value: 12 },
        { id: "GAXU_bL4H--qhTzDZtDsf", date: "2022-03-05T19:36:08.739Z", value: 20 },
        { id: "GAXU_bL5H--qhTzDZtDsf", date: "2022-03-06T19:37:08.739Z", value: 30 },
        { id: "GAXU_bL6H--qhTzDZtDsf", date: "2022-03-07T19:38:08.739Z", value: 40 },
        { id: "GAXU_bL7H--qhTzDZtDsf", date: "2022-03-08T19:39:08.739Z", value: 50 },
        { id: "GAXU_bL8H--qhTzDZtDsf", date: "2022-03-09T19:40:08.739Z", value: 60 },
        { id: "GAXU_bL9H--qhTzDZtDsf", date: "2022-03-13T19:41:08.739Z", value: 70 },
        { id: "GAXU_bL10H--qhTzDZtDsf",date: "2022-03-13T19:42:08.739Z", value: 81 }
    ],
    isNext: true
   };

db.get("deals").defaults(defaultDeals).write()

// deals data - used by client.js
app.get("/api/v1/deals", function(request, response, next) {
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const isDesc = parseInt(request.query.isDesc) || false
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let deals = db.get("deals").value(); // finds all entries in the deals table
    let dealsValue = db.get("deals.dealsList").value(); // finds all entries in the deals table

    let dealsList = dealsValue.sort(function(a, b) {
        let c = new Date(a.date);
        let d = new Date(b.date);
        return isDesc ? c-d : d - c;
    });

    const result = {
        dealsList: deals?.dealsList?.length ? dealsList.slice(startIndex, endIndex): [],
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
let listener = app.listen(8080, function() {
    console.log( srcPath + "/build/index.html")
    console.log("Listening on port " + listener.address().port);
});
