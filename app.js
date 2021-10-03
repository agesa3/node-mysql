const express=require('express')
const mysql = require('mysql')

const app = express()
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dracula',
    database : 'nodemysql'
    
  });

//connect
db.connect((err)=>{
    if(err){
       throw err
    }
    console.log("Mysql Connected Successfully")
})

app.get('/createDb',(req,res)=>{
    let sql="CREATE DATABASE nodemysql";
    db.query(sql,(err,result)=>{
        if(err) throw err
        console.log(result)
        res.send('"Database Created Successfully')
    })
})

//create table
app.get('/createpoststable',(req,res)=>{
    let sql='CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255), PRIMARY KEY (id))'
    db.query(sql,(err,result)=>{
        if(err) throw err
        console.log(result)
        res.send('Posts Table created')

    })
})

//insert data
app.get("/addPost",(req,res)=>{
    let post={title:'Post One',body:'This is test Data'}
    let sql='INSERT INTO posts SET ?';
    let query =db.query(sql,post,(err,result)=>{
        if(err) throw err
        console.log(result)
        res.send('Post added')
    });
})

app.listen('3000',()=>{
    console.log('listening on port 3000')
})