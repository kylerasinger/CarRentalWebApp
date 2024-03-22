import CheckInPage from "@/components/Check-In/CheckInForm";
import { useParams } from "react-router-dom"; // Import useParams hook
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

export default function CheckInView() {
  const { id } = useParams(); // Extract ID from the URI

  return (
    <>
        <Header/>
        <CheckInPage id={id}/> 
        <Footer/>
    </>
  );
}
