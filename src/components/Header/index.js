import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firbase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
        <p className="link" onClick={logoutFnc}>
          LogOut
        </p>
      )}
    </div>
  );
}

export default Header;
