const query = require('../utils/sqlQuery');
const table = 'plans';
const userTable = 'users';
const countryTable= 'countrys';
const table_ecard = 'table_ecard';
let getter = async () => {
    try {
       const item = await query.get(table,'*');
       return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let getCountrys= async()=>{
    try {
        const item = await query.get(countryTable,'*');
        return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let getAllByUserId= async(id)=>{
    try {
        const item = await query.get(table,'*', `WHERE user_id=${id}`);
        return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}

let makeUnactivate= async(expired)=>{
    try {
        for(var i= 0; i<expired.length; i++){
            var id= expired[i].id;
            delete expired[i].id;
            var data= {...expired[i], status: false};
            const update = await query.update(table,data,`WHERE id=${id}`);
        }    
        return true
     }
     catch (err) {
         return false;
     }
}
let create = async (data) => {
    try {
       const item = await query.create(table,data);  
       return true
    }
    catch (err) {
       return false
    }
}

module.exports = {
    getter,
    create,
    getCountrys,
    getAllByUserId,
    makeUnactivate
}