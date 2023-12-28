import NavBarProvider from "../../context/NavBarContext";
import OnClickToggle from "../Create Account/DisplayCreateAccount";

export default function CreateAccount() {
  return (
    <div>
      <NavBarProvider>
        <div>
          <OnClickToggle />
        </div>
      </NavBarProvider>
    </div>
  );
}
