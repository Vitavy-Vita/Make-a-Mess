import { FaRegUserCircle } from "react-icons/fa";
import { useNavBarProvider } from "../../context/NavBarContext";

export default function Login() {
  const value = useNavBarProvider();
  return (
    <div>
      <FaRegUserCircle className={"react-icon"} onClick={value.onClickSlide} />
      <section className={"login-area-desktop"}>
        <form action="login">
          <label htmlFor="email" />
          <input type="email" placeholder={"Email:"} />
          <label htmlFor="password" />
          <input type="password" placeholder={"Password:"} />
        </form>

        <div className={"buttons"}>
          <a href="/">New Account</a>
          <a href="#">Forgot Password</a>
          <button>Login</button>
          <button>Logout</button>
        </div>
      </section>
    </div>
  );
}
