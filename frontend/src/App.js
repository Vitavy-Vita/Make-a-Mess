import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import DisplayPage from "./components/NavBar/DisplayNavBar";
import AuthProvider from "./context/authContext";

function App() {
  return (
    <main>
      <Router>
        <AuthProvider>
          <DisplayPage />
          <AnimatedRoutes />
        </AuthProvider>
      </Router>
    </main>
  );
}

export default App;
