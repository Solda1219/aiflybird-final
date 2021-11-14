const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashSSHA, } = require('../utils/authentication');
const user_model = require('../model/user');
const verify_model = require('../model/verify');
const captcha = require("../utils/captcha");
const secretKey = '1234567890';
const axios = require('axios');
const sessionStorage = require('sessionstorage-for-nodejs');
const nodemailer = require("nodemailer");

let serverURL = 'http://www.aiflybird.com:3000';

let isEmailNameUnique = async (req, res) => {
  const { email, name } = req.body;
  var user_data = await user_model.getUserByMail(email);
  if (user_data.length > 0) return res.json({ message: "Already registered with this Email!" });
  else {
    user_data = await user_model.getUserByName(name);
    if (user_data.length > 0) return res.json({ message: "Already registered with this Name!" });
    else return res.status(200).json({ message: "ok" });
  }
}
let isEmailExists = async (req, res) => {
  console.log("reach here?");
  const { email } = req.body;
  var user_data = await user_model.getUserByMail(email);
  if (user_data.length > 0) return res.json({ message: "ok" });
  else {
    return res.json({ message: "Email not registered" });
  }
}
let signup = async (req, res) => {
  const { email, display_name, business_name, company_size, password, activated } = req.body;
  var hash_pass = hashSSHA(password)
  var created = user_model.create({ email, display_name, business_name, company_size, password: hash_pass, activated });
  return res.status(200).json({ message: 'registered' });
}
let signCompany= async(req, res)=>{
  const {business_name}= req.body;
  const {id}= req.user;
  try{
    var updated= user_model.update({id, business_name});
    if(updated){
      return res.status(200).json({message: 'Success'});
    }
    else{
      return res.status(401).json({ message: 'Failed' })
    }
  }
  catch(error){
    console.log(errer);
    return res.status(400).json({message: "Something went wrong", err: error});
  }
 
  
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
let setVerify = async (data) => {
  await verify_model.create(data);
}
let sendVerifyEmail = async (req, res) => {
  const { to, verifyFor } = req.body;
  var cookie = makeid(100);
  var createdAt = Math.floor(new Date().getTime() / 1000);
  var data = { email: to, cookie: cookie, createdAt: createdAt, verifyFor }
  var verify_data = await verify_model.getVerifyByEmail(to);
  var user_data = await user_model.getUserByMail(to);
  var name = to;
  if (user_data.length > 0) {
    name = user_data[0].display_name;
  }
  if (verify_data) {
    await verify_model.del(to);
  }
  await setVerify(data);

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
  if(verifyFor=="signup"){
    mailOptions = {
    from: "webmeeting@imflybird.com",
    to: to,
    subject: "Email verification",


    html: `<div class='container'>\
    <div class='card'>\
        <div class='card-header' style='background-color: hsl(214deg 54% 35%); height:50px'><img src='cid:unique@kreata.ee'></div>\
        <div class='card-body' style='border:1px solid hsl(10deg 30% 96%); padding:5px'>\
            <h2>Hello ${name}!</h2>\
            <span>\
                <h4>Welcome to webmeeting!</h4>\n\
                You have successfully created an account. Please activate the account by clicking\
                the button\
                below (activation link valid for 5 days)\
            </span>\
            <div class='row mt-1' style='margin-top:20px; margin-bottom:30px; padding-left:40%'>\
                <span class='col-md-2 col-lg-2 col-4' style="padding:5px 10px; background-color:hsl(198deg 67% 51%); border-radius:50px 20px">\
                    <a href='${serverURL}/_api/verifyCode?email=${to}&cookie=${cookie}&verifyFor=${verifyFor}' style='color: white; text-decoration: none;' class='btn-primary btn'>Activate Now</a></span>\
            </div>\
            <div class=' mt-5' style='margin-bottom:20px'>\
                If clicking on the button above does not work for any reason, please copy and paste the following URL\
                into a web\
                browser: <a href='${serverURL}/_api/verifyCode?email=${to}&cookie=${cookie}&verifyFor=${verifyFor}'>\
                    ${serverURL}/_api/verifyCode?email=${to}&cookie=${cookie}&verifyFor=${verifyFor}</a>\
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
  }
  else{
    mailOptions = {
    from: "webmeeting@imflybird.com",
    to: to,
    subject: "Password Reset",


    html: `<div class='container'>\
    <div class='card'>\
        <div class='card-header' style='background-color: hsl(214deg 54% 35%); height:50px'><img src='cid:unique@kreata.ee'></div>\
        <div class='card-body' style='border:1px solid hsl(10deg 30% 96%); padding:5px'>\
            <h2>Hello ${name}!</h2>\
            <span>\
                <h4>Welcome to webmeeting!</h4>\n\
                You asked for password reset.\
                Please press button below for verify. (activation link valid for 5 days)\
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
  }
  

  mail.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error);
      return res.status(401).json({ message: 'failure', err: error });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ email: to, cookie: cookie });
    }
  });
}

let changePass= async(req, res)=>{
  var {email, password, cookie}= req.body;
  try{
    var hash_pass = hashSSHA(password)
    var verify_data = await verify_model.getVerifyByEmailCookie({ email, cookie });
    if (verify_data) {
      await user_model.updateByEmail({email, password: hash_pass});
      await verify_model.del(email);
      return res.status(200).json({message: 'ok'});
    }
    else{
      return res.redirect(serverURL + "/#/reset-pass/verification");
    }
  }
  catch(error){
    return res.status(404).json({
      message: 'Something went wrong.', err: error
    });
  }
  
  
}
let verifyCode = async (req, res) => {
  var email = req.query.email;
  var cookie = req.query.cookie;
  var verifyFor = req.query.verifyFor;

  if (verifyFor == "signup") {
    var user_data = await user_model.getUserByMail(email);
    if (user_data.length > 0 && user_data[0].activated == 1)
      return res.redirect(serverURL + "/#/login");
  }
  var verify_data = await verify_model.getVerifyByEmailCookie({ email, cookie });
  if (verify_data) {
    var current = Math.floor(new Date().getTime() / 1000);
    if (current - verify_data.createdAt > 5 * 86400) {
      console.log("then expire??", current - verify_data.createdAt);
      if(verifyFor== "signup"){
        return res.redirect(serverURL + "/#/verification");
      }
      else{
        return res.redirect(serverURL + "/#/reset-pass/verification");
      }
      
    }
    else {
      if (verifyFor == "signup") {
        await user_model.activateByEmail(email);
        await verify_model.del(email);
        return res.redirect(serverURL + "/#/login");
      }
      else {
        return res.redirect(serverURL + "/#/reset-pass/change-pass/" + email+"/"+cookie);
      }

    }
  } else {
    if(verifyFor== "signup"){
      return res.redirect(serverURL + "/#/verification");
    }
    else{
      return res.redirect(serverURL + "/#/reset-pass/verification");
    }
  }

}
let login = async (req, res) => {
  try {

    const { username, password } = req.body;
    //check request
    if (!username || !password) return res.status(401).json({ message: 'Request is wrong.' })
    //check if username exist
    var user_data = await user_model.getUserByMail(username);
    if (user_data.length == 0) {
      user_data = await user_model.getUserByName(username);
    }
    if (user_data.length == 0) return res.status(401).json({ message: 'Unknown Account.' })
    //check status
    const activated = user_data[0].activated;
    if (activated == 0) return res.status(401).json({ message: 'Your account is not activated. Please contact with support team.' })
    //check if password is correct
    const user = user_data[0];
    const u_password = user.password;
    const hashResult = hashSSHA(password);
    if (hashResult == u_password) {
      const ObjForToken = {
        id: user.id,
        email: user.email,
        display_name: user.display_name
      };
      const token = createToken(ObjForToken);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const userInfo = user;
      return res.json({
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt
      });
    } else return res.status(401).json({ message: 'Password is incorrect.' });
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      message: 'Something went wrong.', err: error
    });
  }
};
let resetPasswordByPhone = async (req, res) => {
  try {
    const { phone, password, code } = req.body;
    console.log([phone, password, code])
    const exist_phone = await user_model.getUserByPhone(req.body.phone);
    if (exist_phone.length == 0) return res.status(401).json({ message: "Unregistered phone number." });
    const smsid = sessionStorage.getItem(phone);
    if (smsid != code) {
      return res.status(401).json({ message: "Phone verify code is not correct" });
    }
    sessionStorage.removeItem(req.body.number, smsid);
    const hashResult = hashSSHA(password);
    const updated = await user_model.resetPasswordByPhone(phone, hashResult);
    if (updated) res.status(200).json({ message: 'Successfully updated' })
    else res.status(401).json({ message: 'Failed' });
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      message: 'Something went wrong.', err: error
    });
  }
};
let captchaBlob = async (req, res) => {
  const width = parseInt(req.params.width) || 200;
  const height = parseInt(req.params.height) || 100;
  const { image, text } = captcha(width, height);
  res.send({ image, text });
};
let captchaImage = async (req, res) => {
  const width = parseInt(req.params.width) || 200;
  const height = parseInt(req.params.height) || 100;
  const { image } = captcha(width, height);
  res.send(`<img class="generated-captcha" src="${image}">`);
};
module.exports = {
  login,
  resetPasswordByPhone,
  captchaBlob,
  captchaImage,
  isEmailNameUnique,
  signup,
  sendVerifyEmail,
  verifyCode,
  isEmailExists,
  changePass,
  signCompany
}
