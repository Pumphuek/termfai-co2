import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const variants = {
  hidden: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export default function SectionTransition(props: PropsWithChildren) {
  return (
    <motion.div variants={variants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 0.2 }}>
      {props.children}
    </motion.div>
  );
}
