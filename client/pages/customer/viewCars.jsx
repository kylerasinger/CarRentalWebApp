
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../components/Header";
const inter = Inter({ subsets: ["latin"] });

//
//  This is a page for customers to view cars
//

export default function Home() {
  return (
    <>
      <Header/>
      View all available cars
    </>
  );
}
