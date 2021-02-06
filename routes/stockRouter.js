var express = require('express');
var router = express.Router();
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

router.post('/getStockDetails', function(req, res) {
  console.log("stockRouter - /getStockDetails"); 
  let StockName=req.body.StockName;
  StockController.getStockDetails(StockName)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,stockArray:data.stockArray});
  });
});

router.post('/createStock',function(req, res) {
  console.log("stockRouter - /createStock"); 
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
console.log(category)
  if(category==""){
    res.status(400).send({message:"field cant be null"});
  }
  else{
    StockController.createStock(StockName,MarketCap,CurrentMarketPriceofstock,
      Stock,DividendYield,ROCE,ROE,Debttoequity,EPS,Reserves, Debt
      )
    .then(data=>{
      res.status(data.statusCode).send({message:data.message});
    }) 
  }

})

module.exports = router;