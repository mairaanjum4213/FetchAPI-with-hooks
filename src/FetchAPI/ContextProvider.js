import React, {createContext, useContext, useEffect, useReducer} from 'react'

export const Appcontext=createContext();
let API = "https://hn.algolia.com/api/v1/search?";
let initialState ={
  isLoading:true,
  query: "HTML",
  pages:0,
  hits:[]
}

const reducer = (state,action)=>{
  switch(action.type){
    case "GETDATA":
      return{...state, hits: action.payload.hits, isLoading:false}
    case "IS_LOADING":
      return {...state,isLoading:true}
    case "REMOVEPOST":
      return{
        ...state,
        hits : state.hits.filter((elem)=>
        elem.objectID !== action.payload
      )
      }
    case "SEARCH":
      return{
        ...state,
        query:action.payload
      }

      
  }
  return state;
}

//Custom Hook
export const useGlobalContext= ()=> useContext(Appcontext);

export const ContextProvider = (props) => {
   const [state,dispatch] = useReducer(reducer,initialState);

  const removePost=(id)=>{
    dispatch({type:'REMOVEPOST', payload:id})
  }

  const searchPost=(val)=>{
    dispatch({type:"SEARCH",payload:val})
  }

  useEffect(
    
    ()=>{
      const fetchData = async(url)=>{
        dispatch({
          type:"IS_LOADING"
        })
        try{
            const res= await fetch(url);
            const data= await res.json();
            dispatch({
              type:"GETDATA",
              payload : {
                hits:data.hits,
              }
            })
        }
        catch(error){
            console.log(error);
        }
      }
    fetchData(`${API}query=${state.query}&page=${state.pages}`);
    }
  ,[state.query])
  return (
    <Appcontext.Provider value={{...state,removePost,searchPost}}>
        {props.children}
    </Appcontext.Provider>
  )
}


