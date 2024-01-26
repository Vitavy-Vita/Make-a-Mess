import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Menu from "./components/NavBar/NavBar";
import AuthProvider from "./context/authContext";
import RecoveryProvider from "./context/recoveryContext";

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
