const path = require("path");
module.exports = function (req, res){
    if(req.isAuthenticated()){
        res.render(path.resolve('./views/managerPage/create.ejs'))
    }else{
        res.redirect("/manager/login")
    }
}