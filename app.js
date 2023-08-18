var express = require('express')
var bodyParser = require('body-parser')
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'student'
});
 
connection.connect();

var app= express();

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',function(req,res){

  var query = "select * from result1";

  connection.query(query,function(error,results,fields){
    if(error) throw error;
    res.render('index',{results});
  })
})
app.get('/max5',function(req,res){

  var query = "select * from result1 order by total desc limit 5";

  connection.query(query,function(error,results,fields){
    if(error) throw error;
    res.render('max5',{results});
  })
})
app.get('/max10',function(req,res){

  var query = "select * from result1 order by total desc limit 10";

  connection.query(query,function(error,results,fields){
    if(error) throw error;
    res.render('max10',{results});
  })
})

app.post('/',function(req,res){

  var name = req.body.name;
  var sub_1 = req.body.sub_1;
  var sub_2 = req.body.sub_2;
  var sub_3 = req.body.sub_3;
  var sub_4 = req.body.sub_4;
  var sub_5 = req.body.sub_5;
  var total = parseInt(sub_1) + parseInt(sub_2) + parseInt(sub_3) + parseInt(sub_4) + parseInt(sub_5);
  var avg = total/5;
  if(sub_1 < 35 && sub_2 < 35 && sub_3 < 35 && sub_4 < 35 && sub_5 < 35){
    var result= 'Fail';
  }else if(sub_1 < 35 || sub_2 < 35|| sub_3 < 35 || sub_4 < 35 || sub_5 < 35){
    var result= 'ATKT';
  }else if(sub_1 < 35 && sub_2 < 35 || sub_1 < 35 && sub_3 < 35 || sub_1 < 35 && sub_4 < 35 || sub_1 < 35 && sub_5 <35 || sub_2 < 35 && sub_3 < 35 || sub_2 < 35 && sub_4 < 35 || sub_2 < 35 && sub_5 < 35 || sub_3 < 35 && sub_4 < 35 || sub_3 < 35 && sub_5 < 35 || sub_4 < 35 && sub_5 < 35){
    var result= 'ATKT';
  }else {
    var result = 'Pass'
  }

  var print_result= "insert into result1 (name,sub_1,sub_2,sub_3,sub_4,sub_5,total,avg,res)values('"+name+"','"+sub_1+"','"+sub_2+"','"+sub_3+"','"+sub_4+"','"+sub_5+"','"+total+"','"+avg+"','"+result+"')";

  connection.query(print_result,function(error,results,fields){
    if(error) throw error;
      res.redirect('/')
  })

})

app.listen(4001);