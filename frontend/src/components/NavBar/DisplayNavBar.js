import React, { useState } from "react";
import NavBar from "./NavBar";
import MobileConnect from "./MobileConnect";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function DisplayPage() {
  const { scrollY } = useScroll();
  const [fixedNav, setFixedNav] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous) {
      setFixedNav(!fixedNav);
    }
  });

  return (
    <motion.header
      initial={false}
      animate={{
        // opacity: fixedNav ? 0 : 1,
      }}
    >
      <NavBar />
      <MobileConnect />
    </motion.header>
  );
}
