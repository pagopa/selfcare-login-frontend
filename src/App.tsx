// import { setCookie, getCookie } from "./utils/cookie";
import Login from './pages/login/Login';
import { storageWrite, storageRead, storageDelete } from './lib/storage-utils';

const redirectSuccessLogin = () => {
  window.location.assign(`${process.env.REACT_APP_SPID_DASHBOARD}`);
};
const redirectToLogin = () => {
  window.location.assign(`${process.env.REACT_APP_SPID_LOGIN}`);
};

function App() {
  const token = storageRead('token', 'string');
  if (window.location.pathname === '/logout') {
    storageDelete('token');
    redirectToLogin();
  }

  if (token !== null && token !== undefined) {
    redirectSuccessLogin();
  }
  switch (window.location.pathname) {
    case '/login':
      return <Login />;

    case `/login/success`:
      const { hash = '' } = window.location;
      const urlToken = hash.replace('#token=', '');

      if (urlToken !== '' && urlToken !== undefined) {
        storageWrite('token', urlToken, 'string');
        // TODO read and store  uid
        redirectSuccessLogin();
      } else {
        redirectToLogin();
      }
      return <div></div>;
    case '/':
    default:
      redirectToLogin();
      return <div></div>;
  }
}

export default App;
