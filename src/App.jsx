import React, { useEffect } from 'react'
import StaticMarkup from './StaticMarkup'
import { initApp } from './app'

export default function App(){
  useEffect(()=>{
    // initialize the original app logic (DOM-driven) after React has rendered the markup
    initApp()
  },[])

  return <StaticMarkup />
}