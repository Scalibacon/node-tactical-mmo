const userHaveCharacter = require('../utils/userHaveCharacter');

module.exports.index = function(req, res){
    if(req.session && req.session.identifier){
        return res.redirect('/home');
    }

    res.render('index');
}

module.exports.home = async function(req, res){
    if(!req.session || !req.session.identifier){
        return res.redirect('/');
    }

    const have = await userHaveCharacter(req.session.identifier);

    if(!have){        
        return res.redirect("/main-character");
    }

    res.render('home');
}

module.exports.mainCharacter = async function(req, res){
    if(!req.session || !req.session.identifier){
        return res.redirect('/');
    }   

    const have = await userHaveCharacter(req.session.identifier);

    if(have){
        return res.redirect('/home');
    }

    res.render('create-character');
}