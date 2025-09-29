import { motion } from "motion/react";
import { config } from "@/config";

export default function Navbar() {
  return (
    <motion.div
      className="fixed top-0 z-50 p-5 w-full flex justify-center items-center"
      style={{
        maxWidth: `${config.pageMaxWidth}px`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className={`w-full flex max-w-[${config.pageMaxWidth}px] justify-between items-center`}
      >
        <button className="text-4xl">🍔</button>
        <button className="btn-primary">Get in Touch</button>
      </div>
    </motion.div>
  );
}
