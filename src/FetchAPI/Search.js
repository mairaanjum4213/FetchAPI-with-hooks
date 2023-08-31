import React from 'react'
import { useGlobalContext } from './ContextProvider'

export const Search = () => {
   const {query,searchPost} = useGlobalContext();
  return (
    <>
    <h1 style={{textAlign:"center"}}>Tech News on the Go</h1>
    <form>
        <input type="search" placeholder="Search Here" value={query} onChange={(e)=>searchPost(e.target.value)}/>
    </form>
    </>
  )
}
