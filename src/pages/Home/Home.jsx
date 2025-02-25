import React from 'react';
import "../Home/Home.css"
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Featured from '../../components/Featured';
import Footer from '../../components/Footer';


const Home = () => {

  return (
    <>
  
      <Navbar />
      <Hero />
      <Featured />
      <Footer /> 

    </>
  );
};

export default Home;

