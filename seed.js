var mongoose = require("mongoose"),
Stranger   = require("./models/individual"),
User   = require("./models/user"),
Group   = require("./models/group"),
List   = require("./models/dblist");

let seed = {
    deleteList: function(){
        List.deleteMany({}, (err, removed) => {
            if(err){
                return console.log(err);
            } else {
                console.log("List Removed")
            }
        });
    },
    deleteStranger: function(){
        Stranger.deleteMany({}, (err, removed) => {
            if(err){
                return console.log(err);
            } else {
                console.log("Stranger Removed")
            }
        });
    },
    deleteUser: function(){
        User.deleteMany({}, (err, removed) => {
            if(err){
                return console.log(err);
            } else {
                console.log("User Removed")
            }
        });
    },
    deleteGroup: function(){
        Group.deleteMany({}, (err, removed) => {
            if(err){
                return console.log(err);
            } else {
                console.log("User Removed")
            }
        });
    }
}

module.exports = seed;



