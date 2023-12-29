export default function Articles(props) {
  return (
    
    <article>
        <div className="container-articles">
      <h2>
        {props.icon}
        {props.title}
      </h2>
      <section className="article-section">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel non vitae
        ipsa, cupiditate, illum quae harum excepturi debitis iure quo quisquam
        mollitia, perferendis nam quaerat consequuntur dolores accusantium sequi
        alias dolor itaque accusamus necessitatibus aut nisi temporibus.
      </p>
      <div
        style={{
          backgroundImage: `url(${props.image})`,
          width: "150px",
          height: "300px",
          border: "4px solid white",
          borderRadius: "5%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      </section>
      </div>
    </article>
  );
}
