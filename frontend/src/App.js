import "./App.scss";
import Nav from "./components/navBar";

function App() {
  return (
    <body>
      <Nav />

      <main>
        <h1 className={"main-title"}>Welcome to Make-a-Mess</h1>
        <p>Tired of not knowing what you can or cannot eat ?</p>
        <h2>Let us help you!</h2>
        <a href="#">Start Building</a>
        <div className={"bg-burger"}></div>
      </main>
    </body>
  );
}

export default App;
