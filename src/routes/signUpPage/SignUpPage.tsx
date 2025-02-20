import { SignUp } from "@clerk/clerk-react";
import React from "react";

const SignUpPage: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <SignUp signInUrl="sign-in" />
    </div>
  );
};

export default SignUpPage;
