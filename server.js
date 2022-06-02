const express = require("express")
const methodOverride=require("method-override")
const session = require("express-session")
const passport=require('passport')
const swaggerUi=require('swagger-ui-express')
swaggerDocument=require("./swagger.json")
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser")
const connectDB = require("./config/db");
const config = require("./config/db.config");
const path = require("path");
const mongoURI = config.url;
const app = express();
require('dotenv').config();

app.use(methodOverride("_method"))
connectDB().then(() => console.log("Database Connected Successfully!!"))

const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
) //stores the session
app.use(passport.initialize())
app.use(passport.session())

app.get("/",(req, res) => {
    res.render(__dirname+"/views/main/index.ejs")
})

app.get("/managerr",(req, res) => {
    res.render(__dirname+"/views/userPage/manager.ejs")
})
app.get("/loginmanager",function (req,res){
    if(req.isAuthenticated()){
        res.redirect("create")
    }else{
        res.redirect("/manager/login")
    }
})
app.get("/login",function (req,res){
    if(req.isAuthenticated()){
        res.redirect("create")
    }else{
        res.redirect("/seller/login")
    }
})



app.use(express.static('views'));
app.use(express.static('views/main'));
app.use('/manager', require("./routes/managerRoutes"))
app.use('/user', require("./routes/userRoutes"))
app.use('/seller', require("./routes/sellerRoutes"))

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port,() =>
    console.log(`App listening at http://localhost:${port}`)
)