import React from 'react';
import { Inter } from "next/font/google";
import Header from "./Header";
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
        <>
        <button 
          className="text-white bg-black px-4 py-2 rounded hover:bg-gray-700" 
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      <button 
        className="text-white bg-black px-4 py-2 rounded hover:bg-gray-700" 
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}