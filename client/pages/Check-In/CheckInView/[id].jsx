import CheckInPage from "@/components/Check-In/CheckInForm";
import { useRouter } from "next/router"; // Import useRouter hook from Next.js
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

export default function CheckInView() {
  const router = useRouter();
  const { id } = router.query; // Extract ID from the URL

  console.log("Dynamic route ID: " + id);

  return (
    <>
        <Header/>
        <CheckInPage id={id}/> 
        <Footer/>
    </>
  );
}
