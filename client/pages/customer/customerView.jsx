import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/accessDenied";
import CustomerConsole from "../../components/CustomerConsole";   
import CarDisplay from "../../components/CARS/carDisplay";

const inter = Inter({ subsets: ["latin"] });

export default function CustomerView() {
    //this is true if the use is an admin, false if they are not
    const [userAccess, setUserAccess] = useState(null);
    const { data: session } = useSession();
    
    useEffect(() => {
      // This will only run once when the component mounts, and again if the value of `session?.user?.role` changes.
      setUserAccess(session?.user?.role === "customer");
    }, [session?.user?.role]); // Dependency array, ensures effect runs only when session user role changes
  

  return (
    <>
      <Header/>
      This is the customer console
        {userAccess ? <CustomerConsole/> : <AccessDenied/>};
    </>
  );
}
