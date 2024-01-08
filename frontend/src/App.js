import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import NavBarProvider from "./context/NavBarContext";
import DisplayPage from "./components/NavBar/DisplayNavBar";

function App() {
  return (
    <main>
      <Router>
        <NavBarProvider>
          <DisplayPage />
        </NavBarProvider>
        <AnimatedRoutes />
      </Router>
    </main>
  );
}

export default App;
