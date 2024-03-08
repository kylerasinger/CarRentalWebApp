
import React, {useState} from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });
import CarDisplay from "../components/CARS/carDisplay";

export default function Home() {
  return (
    <>
      <Header/>
      {/* LANDING PAGE GOES HERE */}
      
      <CarDisplay/>
      <Footer/>
    </>
  );
}
