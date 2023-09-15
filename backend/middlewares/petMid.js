// pre-processer of add pet controller: cleaning and standard input data.
const addPetMiddleWare = (req,res,next)=>{
    if(req.body.url_anh=='' || typeof req.body.url_anh === 'undefined'){
        req.body.url_anh = undefined;
    }
    const {can_nang,chieu_cao} = req.body;
    if(can_nang =='' || can_nang =='undefined' || typeof can_nang === undefined||  can_nang == null|| can_nang =='null' ||  parseFloat(can_nang)<=0){
        req.body.can_nang = undefined;
    }
    if(chieu_cao =='' || chieu_cao =='undefined' || typeof chieu_cao === undefined||  chieu_cao == null|| chieu_cao =='null' ||  parseFloat(chieu_cao)<=0){
        req.body.chieu_cao = undefined;
    }
    next();
}

module.exports = {
    addPetMiddleWare
}