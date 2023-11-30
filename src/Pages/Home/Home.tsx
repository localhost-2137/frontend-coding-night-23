import { motion, useIsPresent } from "framer-motion";

export default function Home() {
    const isPresent = useIsPresent();
    
    return (
      <div className="flex-1 flex flex-col gap-8 items-center justify-center">
        <h1 className="text-4xl roboto">Some home landing page</h1>
        <h2 className="quicksand text-xl">Coming soon</h2>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: 0,
            transition: { duration: 0.6, ease: "circOut" },
          }}
          exit={{ scaleX: 1, transition: { duration: 0.6, ease: "circIn" } }}
          style={{ originX: isPresent ? 0 : 1 }}
          className="privacy-screen bg-indigo-400 z-50"
        />
      </div>
    );
}