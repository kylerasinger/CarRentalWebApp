
import { Inter } from "next/font/google";
import { useEffect } from "react";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  //this syncs users between nextauthjs and the backend users model, do not touch pls :)
  useEffect(() => {
    const syncUsers = async () => {
      try{
        const response = await fetch('http://localhost:3001/api/syncs', { method: 'POST' });
        if (response.ok) {
          console.log('Users synchronized successfully');
        } else {
          console.error('Failed to synchronize users');
        }
      }catch(error){
        console.log("Error with post sync: ", error);
      }
    };
  
    syncUsers();
  }, []);
  return (
    <>
      <Header/>
      {/* LANDING PAGE GOES HERE */}
      <Cards/>
      <Newsletter/>
      <Footer/>
    </>
  );
}
