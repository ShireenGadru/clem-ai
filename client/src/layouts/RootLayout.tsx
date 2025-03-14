import { Link, Outlet } from "react-router-dom";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
     
        <div className="flex flex-col p-2 sm:p-5  md:px-16 md:py-4 h-screen">
          <header className="flex items-center justify-between">
            <Link to="/" className="flex items-center font-bold gap-2 ">
              <img src="/logo.png" alt="logo" className="w-8 h-8" />
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                CLEM AI
              </span>
            </Link>
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main className="flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
