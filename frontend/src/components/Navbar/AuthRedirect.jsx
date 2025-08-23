import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AuthRedirect() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkUserProfile = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const res = await fetch(backendUrl + `/api/user/${user.id}`);
          if (res.status === 404) {
            // User not found - redirect to role selection
            navigate("/choose-role");
          } else if (res.ok) {
            // User profile exists - redirect to home or profile
            navigate("/");
          } else {
            console.error("Failed to check user profile");
          }
        } catch (e) {
          console.error(e);
        }
      } else if (isLoaded && !isSignedIn) {
        // Not signed in, go to login or landing page
        navigate("/login");
      }
    };

    checkUserProfile();
  }, [isLoaded, isSignedIn, user, navigate]);

  return <div>Loading...</div>; // Or a loader UI
}

export default AuthRedirect;
