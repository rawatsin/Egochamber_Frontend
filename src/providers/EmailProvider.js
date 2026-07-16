"use client"

import { EmailContext } from "@/context/EmailContext"
import { useEffect, useState } from "react"


const EmailProvider = ({children}) => {
    const[contextEmail,setContextEmail]=useState()
    useEffect(()=>{
      const temp=localStorage.getItem("ContextEmail");
      setContextEmail(temp)
    },[])
  return (
    <EmailContext.Provider value={{contextEmail,setContextEmail}}>
        {children}
    </EmailContext.Provider>
  )
}

export default EmailProvider;