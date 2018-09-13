var mongoose = require("mongoose"),
Stranger   = require("./models/individual");

let seed = function(){
    Stranger.deleteMany({},function(err, removed){
        if(err) return handleError(err);
        console.log("Strangers removed");
    });
};

module.exports = seed;



