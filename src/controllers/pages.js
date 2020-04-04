module.exports.index = function(req, res){
    res.render('index');
}

module.exports.home = function(req, res){
    // depois ver se o usuário tem um personagem
    res.redirect("/main-character");
}

module.exports.mainCharacter = function(req, res){
    res.render('create-character');
}