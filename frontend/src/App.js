import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <main>
      <Router>
        <AnimatedRoutes />
      </Router>
    </main>
  );
}

export default App;
