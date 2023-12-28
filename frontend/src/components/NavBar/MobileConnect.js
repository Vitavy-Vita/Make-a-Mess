import { useNavBarProvider } from "../../context/NavBarContext";

export default function MobileConnect() {
  const value = useNavBarProvider()
  return (
    <div className={"mobile-connect"}>
      <section className={value.connectSlide}>
        <div className="buttons">
          <a href="#">New Account</a>
          <a href="#">Login</a>
          </div>
      </section>
    </div>
  );
}
