import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName,setMovieName]=useState('')
  const [review, setReview]=useState('');
  const [movieReviewList, setMovieList]=useState([])

    const [newReview, setNewReview]=useState("");

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
    setMovieList(response.data)
    //  console.log(response.data);
    })
  },[]);


const submitReview=()=>{
 Axios.post("http://localhost:3001/api/insert",{
  movieName:movieName,
   movieReview:review,
  });
  
    setMovieList([...movieReviewList,
      {movieName:movieName, movieReview:review},
    ]);
   //  alert("sucess insert");  
};

const deleteReview=(movie_name)=>{
  Axios.delete('http://localhost:3001/api/delete/${movie_name}');
};

const updateReview=(movie)=>{
  Axios.put('http://localhost:3001/api/update',{
    movieName:movie,
    movieReview:newReview,
  });

  setNewReview("")
};

  return (
    <div className="App">
        <h2> My CRUD App</h2>
        <div className="form">
          <label>Movie Name</label> 
            <input type="text" name="moviename" onChange={(e)=>{
              setMovieName(e.target.value)
            }}></input>
          <label>Review</label>
            <input type="text" name="review" onChange={(e)=>{
              setReview(e.target.value)
            }}></input>
          <button onClick={submitReview}>Submit</button>
            
            {movieReviewList.map((val)=>{
              return(
                <div className="card">
                  <h1>{val.movieName}</h1>
                  <p>{val.movieReview}</p>

                <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
                <input type="text" id="updateinput" onChange={(e)=>{
                  setNewReview(e.target.value)
                }}/>
                <button onClick={()=>{updateReview(val.movieName)}}>Update</button> 
                </div>
              );
              
               
            })}
       
        </div>
    </div>
  );
}

export default App;
