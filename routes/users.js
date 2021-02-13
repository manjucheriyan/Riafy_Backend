var express = require('express');
var router = express.Router();
var BackEndController = require('../services/BackEndController');
var StockController = require('../services/StockController');

function authMiddleware(req,res,next){
  console.log("Inside authMiddleware");
  if(req.session.currentUser){
    next();
  }
  else{    
    res.staus(401).send({message:"Please login"});
  }
}

/* GET users listing. */
router.get('/', function(req, res) {
  console.log("Users router ---- ");
  Bank.getUsers()
  .then(data=>{
    res.status(data.statusCode).send(
      {message:data.message,
        users:data.users});
  });
});


router.post('/login',function(req, res) {
  console.log("Users router ---- login");
  let username=req.body.username;
  let password=req.body.password;
  BackEndController.login(username,password)
  .then(data=>{
    if(data.statusCode==200){
      req.session.currentUser=username;
    }
    res.status(data.statusCode).send({message:data.message});
  }) 
});


router.get('/testing',function(req, res) {
    console.log("Users router ---- testing");
    res.send({text:"Manju Cheriyan"}); 
  } 
);


router.post('/register',function(req, res) {
  console.log("Users router ---- register");
  let StockName=req.body.StockName;       
  let category = req.body.category;
  let MarketCap = req.body.MarketCap  ;
  let CurrentMarketPriceofstock=req.body.CurrentMarketPriceofstock;
  let Stock=req.body.Stock;
  let DividendYield=req.body.DividendYield;
  let ROCE=req.body.ROCE;
  let ROE=req.body.ROE;
  let Debttoequity=req.body.Debttoequity;
  let EPS=req.body.EPS;
  let Reserves=req.body.Reserves;
  let Debt=req.body.Debt;

  if(category==""){
    res.status(400).send({message:"field cant be null"});
  }
  else{
    StockController.addUser(StockName,MarketCap,CurrentMarketPriceofstock,
      Stock,DividendYield,ROCE,ROE,Debttoequity,EPS,Reserves, Debt
      )
    .then(data=>{
      res.status(data.statusCode).send({message:data.message});
    }) 
  }
})

router.post('/categoryList', function(req, res) {
  console.log("Users router ---- categoryList");
  let category=req.body.category;
  
  StockController.getProvidersByCategory(category)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,users:data.users});
  });
});

module.exports = router;