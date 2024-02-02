import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

import AuthProvider from "./contexts/auth";
import { ToastContainer } from "react-toastify"; //config p/ usar o toast
import 'react-toastify/dist/ReactToastify.css'; //config p/ usar o toast

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000}/>
        <RoutesApp/>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
