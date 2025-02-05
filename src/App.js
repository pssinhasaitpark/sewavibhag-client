import React from 'react'
import Sidebar from './view/layout/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Jilareport from './view/components/Jilareport';
  

function App() {
  return (
    <div>
      <Sidebar /> 
      <Jilareport/>
    </div>
  )
}

export default App
