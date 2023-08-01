const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const request=require("request");

var app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;

  var data={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };

  var jsonData=JSON.stringify(data);

  const url="https://us8.api.mailchimp.com./3.0/lists/5c7b4aa268";

  const options ={
    method: "POST",
    auth: "abhiram:a26304829133eb2b7d5a52038f98245d-us8"
  }

  const request = https.request(url,options,function(response){

    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }



    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Running on port 3000");
})

//API KEY
//a26304829133eb2b7d5a52038f98245d-us8


//List ID
//5c7b4aa268
