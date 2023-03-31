const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
    let location = req.body.loc;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=c9743357cae21973a3874ebd9e912104&units=metric";
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const feels = weather.main.feels_like;
            const description = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.render("list", {
            loc: location,
            temparature: temp,
            feelsLike: feels,
            des: description,
            image: imgUrl
          });
          /*  res.write("<img src=" + imgUrl + ">");
            res.send();*/
          });
        });
      });



app.listen(3000, function() {
  console.log("Server is ruuning at 3000");
});
