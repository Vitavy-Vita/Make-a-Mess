import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/HomePage/Home";
import CreateAccount from "./components/Create Account/CreateAccount";

function App() {
  return (
    <body>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
        </Routes>
      </Router>
    </body>
  );
}

export default App;
