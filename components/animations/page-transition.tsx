import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const variants = {
  hidden: { opacity: 0, y: 200 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 200 },
};

export default function PageTransition(props: PropsWithChildren) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.5 }}
    >
      {props.children}
    </motion.div>
  );
}
