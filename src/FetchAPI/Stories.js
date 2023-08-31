import React from 'react'
import { useGlobalContext } from './ContextProvider'
import "./Stories.css";
export const Stories = () => {
  const {hits,isLoading,removePost}= useGlobalContext();
  return (
    <>
     
    {isLoading? 
    (<div id="preloader">
        <div id="text">Loading</div>
        <div class="wrapper" id="firstWrap"><div class="dot"></div></div>
        <div class="wrapper" id="secondWrap"><div class="dot"></div></div>
        <div class="wrapper" id="thirdWrap"><div class="dot"></div></div>
        <div class="wrapper" id="fourthWrap"><div class="dot"></div></div>
        </div> )
        : 
    (hits.map((data)=>{
      return(
        <>
      <div className='stories-div'>
      <div className="card">
      <h2>{data.title}</h2>
      <p>By <span>{data.author}</span> | <span>{data.num_comments}</span> comments</p>
      <div className="card-button">
        <a href={data.url} target="_blank">Read More</a>
        <a href="#" onClick={()=>removePost(data.objectID)}>Remove</a>
      </div>
      </div>
      </div>
   </>
   )}))

    }
    
    </>
  )
}
