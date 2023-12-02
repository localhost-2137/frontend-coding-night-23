import { motion, useIsPresent } from "framer-motion";
import Logo from "../../Layout/Assets/logo.png";
import Button from "../../Components/Button";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Atoms";

export default function Home() {
  const isPresent = useIsPresent();
  const user = useAtomValue(userAtom);

  return (
    <div className="flex-1 flex gap-8 items-center justify-around">
      <img src={Logo} alt="Logo" />
      <div className="w-[500px] border-4 border-bgLght rounded-xl py-8 flex flex-col items-center gap-10">
        <h1 className="text-5xl roboto">Home Lord</h1>
        <p className="w-3/4 text-2xl text-gray-100 quicksand font-semibold">
          Introducing our cutting-edge monitoring app for indoor spaces. It
          keeps you informed on power consumption, air humidity, and temperature
          in real-time.
        </p>
        <p className="w-3/4 text-2xl text-gray-100 quicksand font-semibold">
          Ensure a healthy environment by monitoring air humidity, and stay
          ahead of temperature changes for comfort.
        </p>
        <Button type="default" isLink to={user.email ? "/rooms" : "/login"}>
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
