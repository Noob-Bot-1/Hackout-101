var express= require ("express");
var app=express();
var bodyParser= require ("body-parser");

var mongoose= require ("mongoose");

var passport= require ("passport");
var User=require("./model/user");

var LocalStrategy= require ("passport-local");
var passportLocalMongoose= require ("passport-local-mongoose");

mongoose.connect("mongodb://localhost/user_hack");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


app.use(require("express-session")({
    secret:"vibhu bola h",
    resave:false,
    saveUninitialized:false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

 
app.get("/",function(req,res){
    //this will be login signup page
    res.render("landingpage.ejs");

});

app.get("/home",function(req,res){
    //this will be login signup page
    res.render("Homepage.ejs");

});


app.get("/register",function(req,res){
    //this will be login signup page
    res.render("register.ejs");


});
app.get("/login",function(req,res){
    //this will be login signup page
    res.render("login.ejs");


});

app.get("/logout",function(req,res){
    //this will be login signup page
    req.logout();

    res.redirect("/");


});
app.post("/register" ,function(req,res)
{
    var newUser=new User({username: req.body.username}); 
    User.register(newUser, req.body.password, function(err, user){
        if(err)
        {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/home");
        });
    });

});
app.post("/login",passport.authenticate("local", 
{
    successRedirect:"/home",
    failureRedirect:"/login"
}),
 function(req,res){

 });



   

app.listen(3001,function()
{
    console.log("yelpcamp started");
});