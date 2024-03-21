import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AccessDenied from "../../components/accessDenied";
import CsrConsole from "../../components/csrConsole";

const inter = Inter({ subsets: ["latin"] });

export default function CsrView() {
    //this is true if the use is an admin, false if they are not
    const [userAccess, setUserAccess] = useState(null);
    const { data: session } = useSession();
    
    useEffect(() => {
      // This will only run once when the component mounts, and again if the value of `session?.user?.role` changes.
      setUserAccess(session?.user?.role === "csr");
    }, [session?.user?.role]); // Dependency array, ensures effect runs only when session user role changes
  


  return (
    <>
      <Header/>
        { userAccess ? <CsrConsole/> : <AccessDenied/> }
      <Footer/>
    </>
  );
}
