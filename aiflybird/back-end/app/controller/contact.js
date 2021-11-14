const setting = require('../../config/setting');
const model = require('../model/contact');
const core_func = require('../utils/core_func');
let get = async (req, res) => {
  try {
    const {id}= req.user;
    const item = await model.getContactsByUserId(id);
    return res.json({ result: item });
  }
  catch (error) {
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
    const data = req.body;
    const user_id= req.user.id;
    try{
        const exist= await model.isExist(data.email, user_id);

        if(exist){
            if(exist.id== data.id){
                await model.update({...data, user_id});
            }
            else{
                return res.status(401).json({message: 'This email contact is already exist!'});
            }
        }else{
            await model.update({...data, user_id});
        }
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
  get,
  create,
  del,
  update
}
