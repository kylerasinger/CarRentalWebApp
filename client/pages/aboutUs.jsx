import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function aboutUs(){
    return(
        <>
            <Header />
            <div className="bg-white text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                        <img className="object-cover object-center rounded" alt="hero" src="/images/CR_Logo.png"/>
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            About Us
                        </h1>
                        <p className="mb-8 leading-relaxed">
                        At CarX, we understand that the journey is just as important as the destination. That's why we're dedicated to providing you with exceptional car rental services that ensure a smooth and memorable travel experience. Whether you're planning a weekend getaway, a business trip, or simply need a reliable vehicle for your daily commute, CarX is here to meet your needs with convenience, affordability, and reliability.
                        </p>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            Contact Us
                        </h1>
                        <p>Ready to experience the convenience and reliability of CarX? Explore our website to browse our fleet, check out our latest offers, and book your rental today. Have questions or need assistance? Click below
                        </p>
                        <div className="flex justify-center pt-4">
                            <a href="/contact" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}