
import React, {useState} from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import navbar from "../components/navbar";
import Hero from "../components/Hero"
import Analytics from "../components/Analytics";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });
import CarDisplay from "../components/CARS/carDisplay";

export default function Home() {
  return (
    <>
      <Header/>
      {/* LANDING PAGE GOES HERE */}
      <div>

      <Cards />
      
               
      </div>
      <CarDisplay/>
      <Footer/>
    </>
  );
}
