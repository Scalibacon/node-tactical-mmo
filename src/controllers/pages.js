const userHaveCharacter = require('../utils/userHaveCharacter');

module.exports.index = function(req, res){
    res.render('index');
}

module.exports.home = function(req, res){
    if(!userHaveCharacter(req.session.identifier)){
        res.redirect("/main-character");
    }
}

module.exports.mainCharacter = function(req, res){
    if(!req.session.identifier){
        return res.redirect('/');
    }   

    if(userHaveCharacter(req.session.identifier)){
        return res.redirect('/');
    }

    res.render('create-character');
}