export default function Login() {
  return (
    <article className="center-container">
      <h1>Please login to your account:</h1>
      <section className="form-container">
        <form action="create">
          <label htmlFor="Name"></label>
          <input type="text" placeholder="Name:" size='25' required/>
          <label htmlFor="Password"></label>
          <input type="password" placeholder="Password:" size='25' required/>
        </form>
        <button className={"button-form"}>Validate</button>
      </section>
    </article>
  );
}
