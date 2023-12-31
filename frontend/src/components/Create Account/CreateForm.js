export default function CreateForm() {
  return (
    <div className="center-container">
        <h1>Create your account:</h1>
      <section className="form-container">
        <form action="create">
          <label htmlFor="Name"></label>
          <input type="text" placeholder="Name:" />
          <label htmlFor="Password"></label>
          <input type="password" placeholder="Password:" />
          <label htmlFor="Password"></label>
          <input type="password" placeholder="Confirm Password:" />
          <label htmlFor="telephone"></label>
          <input type="tel" placeholder="Phone number:" />
          <label htmlFor="Email"></label>
          <input type="email" placeholder="Email:" />
        </form>
        <button className={"button-form"}>Validate</button>
      </section>
    </div>
  );
}
