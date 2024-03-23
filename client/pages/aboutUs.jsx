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
                            Here you can add a brief introduction about your company, 
                            its values, mission, and the story behind its foundation. 
                            You can also mention the unique qualities that set your company apart.
                        </p>
                        <div className="flex justify-center">
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