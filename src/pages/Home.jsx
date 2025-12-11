import React from 'react'
import Hero from '../component/Hero'
import Service from '../component/Service'
import QuizBundle from '../component/QuizBundle'
import FAQ from '../component/FAQ.JSX'
import Achievements from '../component/Acheivements'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
export default function Home() {
  return (
    <>
      <Navbar/>
    <Hero/>
    <Service/>
    <Achievements/>
    <QuizBundle/>
    <FAQ/>
    <Footer/>
    </>
  )
}
