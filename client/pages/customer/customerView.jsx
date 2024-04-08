import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import CustomerConsole from "../../components/CustomerPage/customerConsole";
import AccessDenied from "../../components/accessDenied";
import Header from "../../components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function CustomerView() {
    //this is true if the use is an admin, false if they are not
    const [userAccess, setUserAccess] = useState(null);
    const { data: session } = useSession();
    
    useEffect(() => {
      // This will only run once when the component mounts, and again if the value of `session?.user?.role` changes.
      const hasAccess = session?.user?.role === "customer" || session?.user?.role === undefined;
      setUserAccess(hasAccess);
    }, [session?.user?.role]); // Dependency array, ensures effect runs only when session user role changes
  
    //something with the Modal's is causing the header to bug out and get covered by the cars display
  return (
    <>
        <Header></Header>
        {userAccess ? <CustomerConsole/> : <><Header/><AccessDenied/></>}; 
    </>
  );
}
