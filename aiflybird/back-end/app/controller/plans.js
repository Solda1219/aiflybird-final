const setting = require('../../config/setting');
const model = require('../model/plans');
const core_func = require('../utils/core_func');
const { TokenExpiredError } = require('jsonwebtoken');
let getCountrys= async (req, res)=>{
    try{
        const item= await model.getCountrys();
        return res.json({result: item});
    }
    catch(error){
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}

let getAllPlans= async(req, res)=>{
    try{
        const {id}= req.user;
        const item= await model.getAllByUserId(id);
        return res.json({result: item});
    }
    catch(error){
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let getAboutExpire= async(req, res)=>{
    try{
        const {id}= req.user;
        const item= await model.getAllByUserId(id);
        var aboutExpired= [];
        var now= new Date();
        aboutExpired= item.filter(one=>{
            var diff= core_func.diffTwoDate(now, one.expiration_at);
            if(diff> 0&& diff<=7){
                return true;
            }
        })
        return res.json({result: aboutExpired});
    }
    catch(error){
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let getExpired= async(req, res)=>{
    try{
        const {id}= req.user;
        const item= await model.getAllByUserId(id);
        var expired= [];
        var now= new Date();
        expired= item.filter(one=>{
            var diff= core_func.diffTwoDate( now, one.expiration_at );
            if(diff<=0){
                return true;
            }
        });
        //make status=false about expired
        await model.makeUnactivate(expired);
        return res.json({result: expired});
    }
    catch(error){
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}

let buyPlan= async(req, res)=>{
    try {
        const {id}= req.user;
        const data= req.body;
        const {billing_addr}= data;
        var jsonPackedBill= JSON.stringify(billing_addr);
        var user_id= id;
        //date part
        const date= new Date();
        var subscription_at= date;
        const {duration}= data;
        var year= date.getFullYear();
        var month= date.getMonth();
        var day= date.getDate();
        var expiration_at= '';
        if(duration==365){
            expiration_at= new Date(year+1, month, day);
        }
        else if(duration== 365*2){
            expiration_at= new Date(year+2, month, day);
        }
        else if(duration== 365*3){
            expiration_at= new Date(year+3, month, day);
        }
        delete data.billing_addr;
        var modifiedData= {...data, user_id, subscription_at, expiration_at, status:1, billing_addr: jsonPackedBill};
        await model.create(modifiedData);
        return res.json({ message: 'Success' });
      }
      catch (error) {
        return res.status(400).json({
          message: 'Something went wrong.', err: error
        });
      }
}

module.exports = {

  getCountrys,
  buyPlan,
  getAllPlans,
  getAboutExpire,
  getExpired
}
