const {User}= require("../models/users");
//const {StockData}= require("../models/stocks");

let currentUser;


function getUsers(){
    return User.find({}) 
    .then (users=>{
            return{
                statusCode:200,
                users:users
            }
    })
}


function login(username,password){
    console.log('BackendController.js ---- login')
    return User.findOne({
        username,
        password
    })
    .then (user=>{
        if(user){
            return{
                statusCode:200,
                message:"Logged in successfully"
            }
        }
        return {
            statusCode:400,
            message:"Invalid credentialls"
        }
    })
    
}



function deleteUser(username){
    console.log('DeleteUser Function in Bank.js')
    return User.findOne({
        username
    })
    .then (user=>{
        if(user){
            user.delete();
            return{
                statusCode:200,
                message:"Deleted user successfully"
            }
        }
        return {
            statusCode:200,
            message:"Deletion Failed"
        }
    })

}

function setCurrentUser(username){
    console.log("Express Bank setCurrentUSer"+username)
    currentUser=username;
}

function getCurrentUser(){
    return currentUser;
}


module.exports={
    getUsers:getUsers,
    
    login:login,
    
    setCurrentUser:setCurrentUser,
    getCurrentUser:getCurrentUser,
    deleteUser:deleteUser
    }