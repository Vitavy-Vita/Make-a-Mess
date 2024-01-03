export default function CreateForm() {
  return (
    <article className="center-container">
      <h1>Create your account:</h1>
      <section className="form-container">
        <form action="create">
          <label htmlFor="Name"></label>
          <input type="text" placeholder="Name:"size="25" required />
          <label htmlFor="Password"></label>
          <input type="password" placeholder="Password:" size="25" required />
          <label htmlFor="Password"></label>
          <input type="password" placeholder="Confirm Password:" size="25" required />
          <label htmlFor="telephone"></label>
          <input type="tel" placeholder="Phone number:" size="25" required />
          <label htmlFor="Email"></label>
          <input type="email" placeholder="Email:"size="25" required />
        </form>
        <button className={"button-form"}>Validate</button>
      </section>
    </article>
  );
}
