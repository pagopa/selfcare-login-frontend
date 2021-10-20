// import { setCookie, getCookie } from "./utils/cookie";
import Login from './pages/login/Login';
import { storageWrite, storageRead } from './lib/storage-utils';
function App() {
  const { hash = '' } = window.location;
  const urlToken = hash.replace('#token=', '');
  if (window.location.href === 'http://localhost:3000/') {
    console.log(window.location);
    return <Login />;
  } else {
    if (window.location.href === `http://localhost:3000/login/success#token=${urlToken}`) {
      console.log(urlToken);
      storageWrite('token', urlToken, 'string');
      const sessionStorageRead = storageRead('token', 'string');
      console.log(sessionStorageRead);
      // window.location.assign(`${process.env.REACT_APP_SPID_LOGIN}`);
    }
  }

  return <div></div>;
}

export default App;
