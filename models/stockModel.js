const mongoose=require('mongoose');

const StockConstant = mongoose.model('StockConstant',{
    StockName:String,
    MarketCap:String,
    CurrentMarketPriceofstock:String,
    StockPE:String,
    DividendYield:String,
    ROCE:String,
    ROE:String,
    Debttoequity:String,
    EPS:String,
    Reserves:String,
    Debt:String
    
})

module.exports ={
    StockConstant
}

