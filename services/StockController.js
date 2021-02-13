const {StockConstant}= require("../models/stockModel");


function getStockDetails(StockName){
    console.log("stockController - getStockDetails");
    return StockConstant.find({"StockName":StockName}) 
    .then (stockArray=>{
            return{
                statusCode:200,                
                stockArray:stockArray
            }
    })
}


function createStock(StockName,MarketCap,CurrentMarketPriceofstock,Stock,DividendYield,ROCE,ROE,Debttoequity,EPS,Reserves, Debt){
    console.log("stockController - createStock"); 
    return StockConstant.findOne({
        StockName
        
    })
    .then (item=>{        
        if(item){
            return {
                statusCode:400,
                message:"Record already exists"
            }
        }
        const newStockConstant= new StockConstant({StockName,MarketCap,CurrentMarketPriceofstock,Stock,DividendYield,ROCE,ROE,Debttoequity,EPS,Reserves, Debt});
        newStockConstant.save();
        return {
            statusCode:200,
            message:"Record created successfully"
        }
    })
}


module.exports={
    getStockDetails:getStockDetails,
    createStock:createStock
    }