import NavBarProvider from "../../context/NavBarContext";
import OnClickToggle from "../NavBar/DisplayNavBar";

export default function Home() {
  return (
    <NavBarProvider>
      <div>
        <OnClickToggle />
      </div>
    </NavBarProvider>
  );
}
