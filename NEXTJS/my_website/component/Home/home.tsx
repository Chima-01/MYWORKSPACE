"use client";
import Hero from '@/component/Home/Hero/Hero';
import Restaurant from './Restaurant/Restaurant';
import Categority from './Category/Categority';
import HowItWorks from './HowItWork/HowItWorks';
import About from './About/About';
import Feature from './Feature/Feature';
import ClientReview from './ClientReview/ClientReview';
import MobileApp from './ClientReview/MobileApp/MobileApp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Homepage = () => {
  useEffect(()=> {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });;
    };

    initAOS();
  }, [])

  return (
    <div>
      <Hero />
      <Restaurant />
      <Categority />
      <HowItWorks />
      <About />
      <Feature />
      <ClientReview />
      <MobileApp />
    </div>
  )
}

export default Homepage;