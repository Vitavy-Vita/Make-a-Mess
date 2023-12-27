import "./App.scss";
import NavBarProvider from "./context/NavBarContext";
import OnClickToggle from "./components/DisplayNavBar";

function App() {
  return (
    <body>
      <NavBarProvider>
        <div>
          <OnClickToggle />
        </div>
      </NavBarProvider>
    </body>
  );
}

export default App;
