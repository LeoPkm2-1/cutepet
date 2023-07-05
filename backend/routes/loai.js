var express = require('express');
var router = express.Router();
var db=require('../models/database');

function selectData(query){
  
}
router.get('/getAll', function(req, res, next) {
  let sql = `SELECT * FROM anh`;
  db.query(sql).then((data) => {
    console.log("thanhf coong", data);
    res.send(JSON.stringify(data));
  })
});
router.post('/addAnh', function(req, res, next) {
  const url = req.query.url || "1333";
  console.log(url, "url");

  let sql = `INSERT INTO Anh (url) VALUES (${url});`;
  db.query(sql).then((data) => {
    console.log("thanhf cong", res);
    res.json("Thêm thành công");
  })
});
router.post('/store', function(req, res, next) {
    //nhận dữ liệu từ addnew để thêm record vào db
});
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  res.send('Form chỉnh loại sách' + id);
});
router.post('/update', function(req, res, next) {
    //nhận dữ liệu từ edit để cập nhật vào db
});
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  res.send('Xóa loai');
});

module.exports = router;