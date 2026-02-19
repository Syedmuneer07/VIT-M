import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firbase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg";
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged Out Successfully!");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message); 
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="navbar">
      <p className="logo">VIT-M.</p>
      {user && (
        <div style={{display:"flex", alignItems:"center", gap:"0.75 rem"}}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            alt="Profile"
            
            style={{borderRadius:"50%", width:"1.5rem", height:"1.5rem", objectFit:"cover"}}
            />
        <p className="link" onClick={logoutFnc}>
          LogOut
        </p>
        </div>
      )}
    </div>
  );
}

export default Header;
