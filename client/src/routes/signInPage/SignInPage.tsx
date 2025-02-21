import { SignIn } from "@clerk/clerk-react";
import React from "react";

const SignInPage: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      {" "}
      <SignIn signUpUrl="sign-up" forceRedirectUrl="/dashboard"/>
    </div>
  );
};

export default SignInPage;
