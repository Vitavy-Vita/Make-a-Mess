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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum tempora magnam, non quo deserunt itaque unde nostrum culpa consequatur possimus? Soluta, aspernatur odit ratione laboriosam necessitatibus tempora nihil mollitia odio sed aperiam. Id placeat non porro sapiente. Quasi, nesciunt quam quidem illo fugit veniam rerum ad vitae laborum sed, facilis ea. Quaerat sint dignissimos delectus veniam odit ex et nam quidem nostrum saepe odio ducimus blanditiis, architecto vero quod perspiciatis laborum recusandae tenetur in sed nemo error. 
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
