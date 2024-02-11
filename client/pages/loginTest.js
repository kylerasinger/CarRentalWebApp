//
//  This is a test page to test the login functionality of the app
//  It was given by a tutorial and is not used in the app, used it to understand if you need 
//
import React from 'react';
import { Inter } from "next/font/google";
import Header from "../components/Header";
import LoginButton from '../components/LoginButton';
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}