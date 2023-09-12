const { ObjectId } = require('mongodb');
const postModel = require('../models/postModel');
const createStatusPost = async (req,res)=>{
    const text = req.body.text;
    const media = req.body.media;
    const numOfLike = 0;
    const numOfDislike = 0;
    const numOfComment = 0;
    const post = {
        text,
        media,
        createAt:Date.now(),
        numOfLike,
        numOfDislike,
        numOfComment,
    }
    await postModel.addStatusPostData(post).then(data=>{
        return data.payload.insertedId;
    }).catch(err=>console.log(err))
}

module.exports = {createStatusPost};