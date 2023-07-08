const userModel = require("../models/user")
const register = async (req, res) => {
    const data = await userModel.getAll();
    console.log(data, " data");
    res.send(data);
}
// For View 
const login = (req, res) => {

    res.send("login" );
}

const logout = (req, res) => {
    res.send("logout" );
}

module.exports =  {
    register,
    login,
    logout,
};