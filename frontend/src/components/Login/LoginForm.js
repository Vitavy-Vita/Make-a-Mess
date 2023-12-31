export default function Login() {
  return (
    <div className="center-container">
      <h1>Please login to your account:</h1>
      <section className="form-container">
        <form action="create">
          <label htmlFor="Name"></label>
          <input type="text" placeholder="Name:" />
          <label htmlFor="Password"></label>
          <input type="password" placeholder="Password:" />
        </form>
        <button className={"button-form"}>Validate</button>
      </section>
    </div>
  );
}
