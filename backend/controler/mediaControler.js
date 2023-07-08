
const mediaModel = require("../models/media")
const getAllMedia = async (req, res) => {
    const data =  await mediaModel.getAll();
    console.log(data, " data");
    res.send(data);
}



module.exports =  {
    getAllMedia
};
