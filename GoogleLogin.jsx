import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const GoogleLogin = () => {
  const { setUser, setShowUserLogin, navigate } = useAppContext();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID_HERE",
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        theme: "outline",
        size: "large",
        width: 300,
      }
    );
  }, []);

  const handleGoogleResponse = (response) => {
    const userObject = JSON.parse(
      atob(response.credential.split(".")[1])
    );

    const userData = {
      name: userObject.name,
      email: userObject.email,
      photo: userObject.picture, // ✅ REAL GOOGLE PHOTO
      provider: "google",
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    setShowUserLogin(false);
    navigate("/");
  };

  return <div id="googleBtn"></div>;
};

export default GoogleLogin;
