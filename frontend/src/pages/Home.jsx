import React from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import AiTools from '../component/AiTools'
import Testimonal from '../component/Testimonal'
import PlanUse from '../component/PlanUse'
import Footer from '../component/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <AiTools/>
      <Testimonal/>
      <PlanUse/>
      <Footer/>
      
    </div>
  )
}

export default Home