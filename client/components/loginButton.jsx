import { useRouter } from 'next/router';

const LoginButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn();
    // Redirect to the registration form after signing in
    router.push('/register');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (session) {
    return (
      <button 
        className="text-white bg-black px-4 py-2 rounded hover:bg-gray-700" 
        onClick={handleSignOut}
      >
        Sign out
      </button>
    );
  }

  return (
    <button 
      className="text-white bg-black px-4 py-2 rounded hover:bg-gray-700" 
      onClick={handleSignIn}
    >
      Sign in
    </button>
  );
};

export default LoginButton;
