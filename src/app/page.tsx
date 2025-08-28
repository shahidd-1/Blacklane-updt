import Hero from '../components/Hero';
import CubeBlock from '../components/CubeBlock';
import HowWeWork from '../components/HowWeWork';
import WhatWeDoPage from '../components/whatwedo';
import ContactUsSection from '../components/contactus'; // 1. Add this import

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      {/* The HowWeWork component replaces the static section */}
      <CubeBlock />
      <HowWeWork />
      <WhatWeDoPage />
      <ContactUsSection /> {/* 2. Add this component here */}
    </main>
  );
}