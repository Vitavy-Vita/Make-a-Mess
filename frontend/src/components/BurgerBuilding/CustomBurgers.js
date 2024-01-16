import React from "react";


const CustomBurgers = () => {

  return (
    <main className="custom-main">
      <article className="custom-container">
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your bread{" "}
          <span className={"emoji"}>🍔</span>
        </h2>
        <section>
           
        </section>
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your protein{" "}
          <span className={"emoji"}>🥩</span>
        </h2>
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your Cheese{" "}
          <span className={"emoji"}>🧀</span>
        </h2>
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your topping{" "}
          <span className={"emoji"}>🥗</span>
        </h2>
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your sauce{" "}
          <span className={"emoji"}>🥫</span>
        </h2>
      </article>
    </main>
  );
};

export default CustomBurgers;
