import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import "./styles.css";
import Button from "../Button";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import { auth,db } from "../../firbase";
import { toast } from "react-toastify";
import {doc,setDoc,getDoc} from "firebase/firestore"   


function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    //authentication logic here create new user in database and then redirect to dashboard
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
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
            createDoc(user);
            navigate("/dashboard"); 
            // crreate doc wit user details in firestore
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password should be same");
        setLoading(false);
      }
    } else {
      toast.error("Please fill all the fields");
      setLoading(false);
    }
  }
  function loginUsingEmail() {
    // authentication logic here login user using email and password and then redirect to dashboard
    console.log("Email:", email);
    console.log("Password:", password);
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Login successful");
        console.log("User logged in:", user);
        setLoading(false);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage); 
      });
    }else{
      toast.error("Please fill all the fields");
      setLoading(false);
    }
    
  }

  async function createDoc(user) {
    // make sure that doc with uid does not exist
    //create document in firestore with user details
    setLoading(true);


    if(!user) return;

    const userRef = doc(db,"users",user.uid);
    const userData = await getDoc(userRef);
    
    if(!userData.exists()){
      try {
      await setDoc(doc(db,"users",user.uid), {
        name: name,
        email:user.email,
        photoURL: user.photoURL? user.photoURL : "",
        createdAt: new Date(),
      });
      toast.success("Doc created");
      setLoading(false);
    } catch(e){
      toast.error(e.message);
      setLoading(false);
    }
    }else{
      toast.error("Doc already exists");
      setLoading(false);
    }
    
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>VIT-M.</span>
          </h2>
          <form>
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
          </form>
          <Button
            disabled={loading}
            text={loading ? "Login..." : "Login Using Email and Password"}
            onclick={loginUsingEmail}
          />
          <p className="p-login">Or</p>
          <Button
            text="Login with google"
            blue={true}
            onclick={() => alert("Login Successful with Google")}
          />
          <p
            className="p-login"
            onClick={() => setLoginForm(!loginForm)}
            style={{ cursor: "pointer" }}
          >
            Or Dont have an account? Click Here
          </p>
        </div>
      ) : (
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

            <Button
              disabled={loading}
              text={
                loading ? "Signing Up..." : "Sign Up Using Email and Password"
              }
              onclick={signupWithEmail}
            />
            <p className="p-login">Or</p>
            <Button
              text="Sign Up with google"
              blue
              onclick={() => alert("Sign Up Successful with Google")}
            />
          </form>
          <p
            className="p-login"
            onClick={() => setLoginForm(!loginForm)}
            style={{ cursor: "pointer" }}
          >
            Or Already have an account? Click Here
          </p>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
