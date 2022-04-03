import React,{useState,createContext} from 'react';
export const Context=createContext();

export const ContextProvider=props=>{
    const [userName,setUserName]=useState("")

    const value={
        userName,
        setUserName
    }
    return <Context.Provider value={value}>{props.children}</Context.Provider>
}
