import './App.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

//Client ID for Google/Fb
import secret from './config/secret.json'
import axios from 'axios'

function App() {


  const googleResponse = async (res) => {
    console.log(res)
    try {
      const response= await axios.post('http://127.0.0.1:8000/api/v1/auth/signup/google/', {"id_token": res.tokenId})
      console.log(response)
      console.log(response.data.key , response.data.user )
    } catch (error) {
      console.log(error.response.data)
    }
    
  }

  const facebookResponse = async (res) => {
    console.log(res)
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <GoogleLogin
          clientId={secret.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={googleResponse}
          onFailure={googleResponse}
          cookiePolicy={'single_host_origin'}
        />

        <FacebookLogin
          appId={4375200082540049}
          autoLoad={true}
          fields="name,email,picture"
          onClick={() => alert('Asd')}
          callback={facebookResponse} 
        />
      </header>
    </div>
  );
}

export default App;
