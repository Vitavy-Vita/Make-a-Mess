import "./App.scss";
import {  BrowserRouter as Router } from "react-router-dom";
import Menu from "./components/NavBar/NavBar";
import AuthProvider from "./context/authContext";
import RecoveryProvider from "./context/recoveryContext";
import AnimatedRoutes from "./routes/AnimatedRoutes";


function App() {
  return (
    <Router>
      <RecoveryProvider>
        <AuthProvider>
          <Menu />
          <AnimatedRoutes />
        </AuthProvider>
      </RecoveryProvider>
    </Router>
  );
}

export default App;
