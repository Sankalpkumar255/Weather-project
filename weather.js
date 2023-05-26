const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyparser.urlencoded({extended: true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})




app.post("/",function(req,res){
    var lat=req.body.Lat;
    var lon=req.body.Lon;
    var apikey="91bf9b2ef9bec0317139f3ecf1666fe1";
    var units="metric";
    var url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apikey+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const weatherdesc=weatherdata.weather[0].description
            const icon="https://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png"
            console.log(weatherdata.main.temp)
            res.write("<h1>The temperature in Latitude: "+lat+" and Longitude: "+lon+" is "+weatherdata.main.temp+" degrees Celcius. </h1> ");
            res.write("The weather is currently "+weatherdesc)
            res.write("<img src="+icon+">")
            res.send()
        })
    })
})
app.listen(3000,function(){
    console.log("Server running on port 3000")
})