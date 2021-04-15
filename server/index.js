const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')
const mysql=require('mysql')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"cruddatabase",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/api/get",(req,res)=>{
    const sqlSelect="select * from cruddatabase.movie_reviews";
    
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
     //   console.log(result);
    })
})

app.post("/api/insert",(req,res)=>{
    const movieName=req.body.movieName;
    const movieReview=req.body.movieReview;

    const sqlInsert="INSERT INTO cruddatabase.movie_reviews (movieName,movieReview) VALUES (?,?)";
    db.query(sqlInsert,[movieName,movieReview],(err,result)=>{
        console.log(result);
    })
});

// app.get('/',(req,res)=>{

// // const sqlInsert= "INSERT INTO cruddatabase.movie_reviews (movieName,movieReview) VALUES ('fast and furious','very good');"

// //     db.query(sqlInsert,32,(err,result)=>{
// //         if(err){
// //             console.log(err);
// //         }
// //         res.send(" hello data into new  ");
// //     })

// });

app.delete("/api/delete/:movieName",(req,res)=>{
   
    const name = req.params.movieName;
    const sqlDelete="DELETE FROM cruddatabase.movie_reviews WHERE movieName = ?";
    db.query(sqlDelete,name,(err,result)=>{
        if (err) console.log(err)
    });

});

app.put("/api/update",(req,res)=>{
   
    const name = req.body.movieName;
    const review=req.body.movieReview;
    const sqlUpdate="UPDATE cruddatabase.movie_reviews SET movieReview=? WHERE movieName =?";
    db.query(sqlUpdate,[review, name],(err,result)=>{
        if (err)
        console.log(err)
    });

});

app.listen(3001,()=>{
    console.log("running on 3001");
});