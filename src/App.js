import "./App.css";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

//Client ID for Google/Fb
import secret from "./config/secret.json";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const googleResponse = async (res) => {
    console.log(res);
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/signup/google/",
        { id_token: res.tokenId }
      );

      setToken(data.key);
      setUser({
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        insuree_id: data.insuree_id,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const facebookResponse = async (res) => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/signup/fb/",
        { accessToken: res.accessToken }
      );

      setToken(data.key);
      setUser({
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        insuree_id: data.insuree_id,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const logout = async () => {
    const config = {}
    console.log(token)
    config.headers = {
      Authorization: `Token ${token}`,
    };
    await axios.get("http://127.0.0.1:8000/api/v1/logout/", config)
    setToken('');
    setUser(null);
    console.log("Logged out")
  }

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <div>
          <h5>Logged in with the user: {user.email}</h5>
          <button onClick={logout}>Logout</button>
          </div>
          
        ) : (
          <div>
            <GoogleLogin
              clientId={secret.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={googleResponse}
              onFailure={googleResponse}
              cookiePolicy={"single_host_origin"}
            />

            <FacebookLogin
              appId={4375200082540049}
              autoLoad={true}
              fields="name,email,picture"
              onClick={() => alert("ok")}
              callback={facebookResponse}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
