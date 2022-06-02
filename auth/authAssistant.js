const path = require("path");
module.exports = function (req, res){
    if(req.isAuthenticated()){
        res.render(path.resolve('./views/sellerPage/index.ejs'))
    }else{
        res.redirect("/seller/login")
    }
}