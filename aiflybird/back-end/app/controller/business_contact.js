const setting = require('../../config/setting');
const model = require('../model/business_contact');
const dept_model= require('../model/dept');
const user_model= require('../model/user');
const verify_model= require('../model/verify');
const core_func = require('../utils/core_func');
const { createToken, hashSSHA, } = require('../utils/authentication');

const nodemailer = require("nodemailer");

let serverURL = 'http://www.aiflybird.com:3000';
let getDeptIdOrcreate= async(req, res)=>{
    try{
        const data = req.body;
        const user_id= req.user.id;
        const id= await dept_model.isExist(data.name, data.business_name, user_id);
        if(id){
            return res.json({id: id, message: 'Success'});
        }
        else{
            var created= await dept_model.create({...data, user_id});
            console.log('created', created);
            return res.json({id: created, message: 'Success'});
        }
       
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let getDepts = async (req, res) => {
  try {
    const {id}= req.user;
    const {business_name}= req.body;
    const item = await dept_model.get(id, business_name);
    return res.json({ result: item });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let getBContacts= async(req, res)=>{
    var bContacts= [];
    var modifiedBContacts= [];
    try {
        const {id}= req.user;
        const {business_name}= req.body;
        const depts = await dept_model.get(id, business_name);
        for(var i= 0; i< depts.length; i++){
            var bContactsDept= await getBContactsByDeptId(depts[i].id);
            bContacts= [...bContacts, ...bContactsDept]
        }
        // for modify
        for(var i= 0; i<bContacts.length; i++){
            var dept_name= await getDeptNameById(bContacts[i].dept_id);
            modifiedBContacts.push({...bContacts[i], dept_name});
        }
        return res.json({ result: modifiedBContacts });
      }
      catch (error) {
        return res.status(400).json({
          message: 'Something went wrong.', err: error
        });
      }
}
let getBContactsByDeptId= async(id)=>{
    try{
        var bContacts= await model.getByDeptId(id);
        return bContacts;
    }
    catch(error){
        return [];
    }
}
let getDeptNameById= async(id)=>{
    try{
        var dept= await dept_model.getOne(id);
        return dept.name;
    }
    catch(error){
        return '';
    }
}
let createDepts= async (req, res)=>{
    try{
        
        const data = req.body;
        const user_id= req.user.id;
        const exist= await dept_model.isExist(data.name, data.business_name, user_id);
        if(exist){
            return res.status(401).json({ message: 'This Department already exists.' });
        }
        await dept_model.create({...data, user_id});
        return res.json({ message: 'Success' });
       
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}

let createBContacts =async(req, res)=>{
    try{
        const data = req.body;
        const {id}= req.user;
        const exist= await model.isExist(data.email, data.dept_id);
        if(exist){
            return res.status(401).json({ message: 'This Contact already exists.' });
        }
        await model.create(data);
        //see if registered or not.
        var users= await user_model.getUserByMail(data.email);
        if(users.length>0){
            return res.json({ message: 'Success' });
        }
        //make registered
        //get create user name and business
        var friend= await user_model.getUserById(id);
        var friendName= friend[0].display_name;
        var friendCompany= friend[0].business_name;
        var defaultPass= '12345678'
        var password = hashSSHA(defaultPass);
        await user_model.create({email:data.email, display_name:data.email, business_name:friendCompany, company_size:"", password, activated:1});
        await sendResetEmailToMate(data.email, 'resetPass',friendName, friendCompany);
        return res.json({message: 'You made signup for your mate'});
       
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let sendResetEmailToMate = async (to, verifyFor, friendName, friendCompany) => {
    var cookie = makeid(100);
    var name= to;
    var createdAt = Math.floor(new Date().getTime() / 1000);
    var data = { email: to, cookie: cookie, createdAt: createdAt, verifyFor }
    var verify_data = await verify_model.getVerifyByEmail(to);
    if (verify_data) {
      await verify_model.del(to);
    }
    await verify_model.create(data);
  
    mail = nodemailer.createTransport({
      host: 'smtphz.qiye.163.com',
      // host: 'hwhzsmtp.qiye.163.com',
      port: 25,
      secure: false,
      auth: {
        user: "webmeeting@imflybird.com",
        pass: "qCJ6zaSSEsKzZHYL"
      }
    });
    let mailOptions={}

    mailOptions = {
    from: "webmeeting@imflybird.com",
    to: to,
    subject: "Account registration and password reset",


    html: `<div class='container'>\
      <div class='card'>\
          <div class='card-header' style='background-color: hsl(214deg 54% 35%); height:50px'><img src='cid:unique@kreata.ee'></div>\
          <div class='card-body' style='border:1px solid hsl(10deg 30% 96%); padding:5px'>\
              <h2>Hello ${name}!</h2>\
              <span>\
                  <h4>Welcome to webmeeting!</h4>\n\
                  <b>${friendName}</b> of <b>${friendCompany}</b> made signup Webmeeting website for you.\
                  Your account has now been activated.\n\
                Your Username is ${name}, Your password is now "12345678". Please reset your login password by clicking below button.(activation link valid for 5 days)\
              </span>\
              <div class='row mt-1' style='margin-top:20px; margin-bottom:30px; padding-left:40%'>\
                  <span class='col-md-2 col-lg-2 col-4' style="padding:5px 10px; background-color:hsl(198deg 67% 51%); border-radius:50px 20px">\
                      <a href='${serverURL}/_api/verifyCode?email=${to}&cookie=${cookie}&verifyFor=${verifyFor}' style='color: white; text-decoration: none;' class='btn-primary btn'>Change Now</a></span>\
              </div>\
              <div class=' mt-5' style='margin-bottom:20px'>\
                  If clicking on the button above does not work for any reason, please copy and paste the following URL\
                  into a web\
                  browser: <a href='${serverURL}/_api/verifyCode?email=${to}&cookie=${cookie}&verifyFor=${verifyFor}'>\
                      ${serverURL}/_api/verifyCode?email=${to}&cookie=${cookie}&verifyFor=${verifyFor}</a>\
              </div>\
              <div style='margin-bottom:20px'>\
                Thank you!\n\
                Webmeeting
              </div>\
          </div>\
          <div class='card-footer' style='background-color: hsl(0deg 0% 96%); height:50px;'>\
              <div>\
                  This is an automatically generated email. Please do not reply.\
              </div>\
              <div>\
                  @2021 Grandstream Networks, Inc. All rights reserved.\
              </div>\
          </div>\
      </div>\
  </div>`,
      attachments: [{
        filename: 'logo_horizontal.png',
        path: `${__dirname}/../../email_template/logo_horizontal.png`,
        cid: 'unique@kreata.ee' //same cid value as in the html img src
      }],
      // html: `<a href= '" + serverURL + "/_api/verifyCode?email=" + to + "&cookie=" + cookie + "+&verifyFor=" +verifyFor+"'><button>Verify</button></a>`,
    };
    
  
    mail.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        // return res.status(401).json({ message: 'failure', err: error });
      } else {
        console.log('Email sent: ' + info.response);
        // return res.status(200).json({ email: to, cookie: cookie });
      }
    });
}
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
let editDepts= async (req, res)=>{
    try{
        const data = req.body;
        const user_id= req.user.id;
        const exist= await dept_model.isExist(data.name, data.business_name, user_id);
        if(exist){
            return res.status(401).json({ message: 'This Department already exists.' });
        }
        await dept_model.update(data);
        return res.json({ message: 'Success' });
       
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let editBContacts= async(req, res)=>{
    try{
        const data = req.body;
        const {id}= req.user;
        const exist= await model.isExist(data.email, data.dept_id);
        if(exist){
            if(exist.id== data.id){
                await model.update(data);
            }
            else{
                return res.status(401).json({message: 'This email and department pair is already exist!'});
            }
        }else{
            await model.update(data);
        }
        
        var users= await user_model.getUserByMail(data.email);
        if(users.length>0){
            return res.json({ message: 'Success' });
        }
        //make registered
        //get create user name and business
        var friend= await user_model.getUserById(id);
        var friendName= friend[0].display_name;
        var friendCompany= friend[0].business_name;
        var defaultPass= '12345678'
        var password = hashSSHA(defaultPass);
        await user_model.create({email:data.email, display_name:data.email, business_name:friendCompany, company_size:"", password, activated:1});
        await sendResetEmailToMate(data.email, 'resetPass',friendName, friendCompany);
        return res.json({message: 'You made signup for your mate'});
       
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let delDepts= async (req, res)=>{
    try{
        const {id}= req.body;
        await dept_model.del(id);
        return res.json({message: 'Success'});
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let delBContacts= async (req, res)=>{
    try{
        const {id}= req.body;
        await model.del(id);
        return res.json({message: 'Success'});
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let create = async (req, res) => {
  try{
    const data = req.body;
    const user_id= req.user.id;
    const exist= await model.isExist(data.email, user_id);
    if(exist){
        return res.status(401).json({ message: 'This contact already exist.' });
    }
    await model.create({...data, user_id});
    return res.json({ message: 'Success' });
   
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let update= async (req, res)=>{
    try{
        const data= req.body;
        const user_id= req.user.id;
        await model.update({...data, user_id});
        return res.json({message: 'Success'});
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let del = async (req, res) => {
  try {
    const {id}= req.body;
    await model.del(id);
    return res.json({message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
module.exports = {
  createDepts,
  create,
  del,
  update,
  getDepts,
  editDepts,
  delDepts,
  createBContacts,
  getBContactsByDeptId,
  getDeptNameById,
  getBContacts,
  editBContacts,
  delBContacts,
  sendResetEmailToMate,
  getDeptIdOrcreate
}
