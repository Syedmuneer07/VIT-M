import React from "react";
import { useState } from "react";
import Input from "../Input";
import "./styles.css";
import Button from "../Button";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firbase";
import { toast } from "react-toastify";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function signupWithEmail() {
    setLoading(true);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    //authentication logic here create new user in database and then redirect to dashboard
    if(name!=="" && email!=="" && password!=="" && confirmPassword!==""){
      if(password===confirmPassword){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User created:", user);
        toast.success("User created successfully");
        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
        // ..
      });
      }else{
        toast.error("Password and Confirm Password should be same")
        setLoading(false);
      }
    }else{
      toast.error("Please fill all the fields")
      setLoading(false);

    }
    
  }

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>VIT-M.</span>
      </h2>
      <form>
        <Input
          label="Full Name"
          state={name}
          setstate={setName}
          placeholder="John Doe"
        />
        <Input
          type="email"
          label="Email Address"
          state={email}
          setstate={setEmail}
          placeholder="JohnDoe@gmail.com"
        />
        <Input
          type="password"
          label="Password"
          state={password}
          setstate={setPassword}
          placeholder="Example123"
        />
        <Input
          label="Confirm Password"
          state={confirmPassword}
          setstate={setConfirmPassword}
          placeholder="Example123"
        />
      </form>
      <Button
        disabled={loading}
        text={loading ? "Signing Up..." : "Sign Up Using Email and Password"}
        onclick={signupWithEmail}
      />
      <p style={{ textAlign: "center", margin: 0 }}>Or</p>
      <Button
        text="Sign Up with google"
        blue
        onclick={() => alert("Sign Up Successful with Google")}
      />
    </div>
  );
}

export default SignupSigninComponent;
