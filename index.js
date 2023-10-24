import express from "express";
import bodyParser from "body-parser";

import jsdom from "jsdom";

//const jsdom = require("jsdom");

const app = express();
const port = 3000;
const { JSDOM } = jsdom;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const listForToday = [];
const listForWork = [];
const listForWorkTomorrow = [];

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();
let year = today.getFullYear();
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1); 
//https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

let whatDayToday = today.toLocaleDateString("en-GB", options);
let whatDaytomorrow = tomorrow.toLocaleDateString("en-GB", options);

app.get("/", (req, res) => {

  console.log(year);

  res.render("index.ejs", 
   { currentDate: whatDayToday,
    currentYear: year,
    items: listForToday,  }
     );

     console.log(today.toLocaleDateString("en-GB", options));
    //https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript

});

app.post("/", (req, res) => {

  let listItems = req.body.listItem;
  listForToday.push(listItems);
  console.log(listForToday);

  res.redirect("/");

});  

app.get("/work", (req, res) => {

  res.render("work.ejs", 
    {currentDate: whatDayToday,
      currentYear: year,
      workItems: listForWork}
  );

});

app.post("/work", (req, res) => {

  let listItemsForWork = req.body.listItemWork;
  listForWork.push(listItemsForWork);
  console.log(listForWork);

  res.redirect("/work");

});  


app.get("/work-tomorrow", (req, res) => {
 
 res.render("work-tomorrow.ejs", 
 {tomorrowsDate: whatDaytomorrow, 
  currentYear: year,
  tomorrowItems: listForWorkTomorrow}
 );
  
});

app.post("/work-tomorrow", (req, res) => {
 
  let stuffForTomorrow = req.body.listTomorrow;
  listForWorkTomorrow.push(stuffForTomorrow);
  console.log(listForWorkTomorrow);

  res.redirect("/work/tomorrow");
   
 });

 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

 