import { motion } from "framer-motion";
export default function Contact() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ y: window.innerWidth, transition: "1s" }}
    >
      <section className="main-title">
        <h2>Let us know what you</h2>
        <h1 className="think">Think !!</h1>
      </section>
      <article className="contact-container">
        <section>
          <h2>Get in touch with our team !</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatem, veritatis necessitatibus! Laborum dicta maiores odit
            porro voluptatem deserunt, sapiente voluptatibus illo eveniet sunt
            ratione ut aperiam hic, sequi deleniti dolorem officia ullam quam
            quia qui. Nulla, ipsa placeat tenetur error officiis magnam minus
            vitae reprehenderit. Porro eligendi quos earum iure?
          </p>
          <h2>Business info</h2>
          <address>
            <span>46 avenue des frères lumières, 78190 Trappes</span>
            <span>Make-a-Mess@gmail.com</span>
            <span>06 03 27 01 57</span>
          </address>
        </section>
        <form action="create">
          <label htmlFor="Name" />
          <input type="text" placeholder="Name:" size="25" required />
          <label htmlFor="Mail" />
          <input type="email" placeholder="Email:" size="25" required />
          <label htmlFor="comment" />
          <textarea
            name=""
            id=""
            cols="25"
            rows="10"
            placeholder="Your Message:"
          ></textarea>
          <button>Send</button>
        </form>
      </article>
      <h2 className="sub-title-contact">Where to find us</h2>
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=1.9822973012924197%2C48.7572974655531%2C1.9858378171920779%2C48.758959589700616&amp;layer=mapnik&amp;marker=48.75812853450152%2C1.9840675592422485"
        
      ></iframe>
      <small>
        <a href="https://www.openstreetmap.org/?mlat=48.75813&amp;mlon=1.98407#map=19/48.75813/1.98407">
          Show a bigger map
        </a>
      </small>
    </motion.main>
  );
}
