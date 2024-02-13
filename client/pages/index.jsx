import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import carDisplay from "../components/carDisplay";
const inter = Inter({ subsets: ["latin"] });
import CarDisplay from "../components/carDisplay";




export default function Home() {
  return (
    <>
      <Header/>
      {/* LANDING PAGE GOES HERE */}
      
      <CarDisplay/> 
    
    </>
  );
}
