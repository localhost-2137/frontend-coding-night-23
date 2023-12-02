import { motion, useIsPresent } from "framer-motion";
import Logo from "../../Layout/Assets/logo.png";
import Button from "../../Components/Button";

export default function Home() {
    const isPresent = useIsPresent();
    
    return (
      <div className="flex-1 flex gap-8 items-center justify-around">
        <img src={Logo} alt="Logo" />
        <div className="w-[500px] h-[700px] border-4 border-bgLght rounded-xl flex flex-col items-center py-16 justify-between">
          <h1 className="text-5xl roboto">Home Lord</h1>
          <p className="w-3/4 text-2xl text-gray-100 quicksand">
            Introducing our cutting-edge monitoring app for indoor spaces. It
            keeps you informed on power consumption, air humidity, and
            temperature in real-time.
          </p>
          <p className="w-3/4 text-2xl text-gray-100 quicksand">
            Easily track energy use patterns, optimizing efficiency. Ensure a
            healthy environment by monitoring air humidity, and stay ahead of
            temperature changes for comfort.
          </p>
          <Button type="default" isLink to="/login">
            Jump in!
          </Button>
        </div>
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