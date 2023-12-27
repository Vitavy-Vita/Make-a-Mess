import { FaRegUserCircle } from "react-icons/fa";

export default function Login() {
  return (
    <div>
      <FaRegUserCircle className={"react-icon"} />
      <section className={"login-area-desktop"}>
        <form action="login">
          <label htmlFor="email" />
          <input type="email" placeholder={"Email:"} />
          <label htmlFor="password" />
          <input type="password" placeholder={"Password:"} />
        </form>

        <div className={"buttons"}>
        <a href="#">New Account</a>
        <a href="#">Forgot Password ?</a>
          <button>Login</button>
          <button>Logout</button>
        </div>
      </section>
    </div>
  );
}
