const query = require('../utils/sqlQuery');
const table = 'verify';
let create = async (data) => {
    try {
        const item = await query.create(table, data);
        return true
    }
    catch (err) {
        return false
    }
}
let getVerifyByEmail = async (email) => {
    try {
        const item = await query.get(table, '*', `WHERE email='${email}'`);
        return item[0];
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

let getVerifyByEmailCookie = async (data) => {
    try {
        const item = await query.get(table, '*', `WHERE email='${data.email}' AND cookie= '${data.cookie}'`);
        return item[0];
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

let del = async (email) => {
    try {
        await query.del(table, `WHERE email = '${email}'`);
        //    await query.del(membergrouptable,`WHERE email = "${email}"`); 
        return true
    }
    catch (err) {
        return false
    }
}

module.exports = {
    create,
    getVerifyByEmailCookie,
    getVerifyByEmail,
    del
}