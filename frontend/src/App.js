import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import DisplayPage from "./components/NavBar/DisplayNavBar";

function App() {
  return (
    <main>
      <Router>
        <DisplayPage />
        <AnimatedRoutes />
      </Router>
    </main>
  );
}

export default App;
