import { Link, useNavigate } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";
import background from "./graphics/loginBackground.jpg";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { TbArrowLeft } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner";

export default function Register() {
  const isPresent = useIsPresent();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const register = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !repeatPasswordRef.current?.value ||
      !usernameRef.current?.value
    ) {
      toast.error("Fill in all the fields!");
      return;
    } else if (!emailRegex.test(emailRef.current?.value)) {
      toast.error("Enter a valid email!");
      return;
    } else if (
      passwordRef.current?.value !== repeatPasswordRef.current?.value
    ) {
      toast.error("Passwords don't match!");
      return;
    } else if (passwordRef.current?.value.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        username: usernameRef.current?.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode >= 400 && data.statusCode < 500) {
          toast.error("Email or username already taken!");
          setIsLoading(false);
          return;
        } else {
          toast.success("Registered successfully!");
          setTimeout(() => {
            setIsLoading(false);
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong while registering!");
        console.log(err);
      });
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="xl:w-1/3 lg:w-1/2 w-screen flex flex-col items-center justify-center gap-6 relative">
        <Link
          className="absolute top-4 left-4 text-gray-400 flex items-center gap-2 hover:text-white transition-all"
          to="/"
        >
          <TbArrowLeft />
          Back to home
        </Link>
        <h1 className="text-7xl mb-16 roboto">Register</h1>
        <Input
          placeholder="Username"
          ref={usernameRef}
          disabled={isLoading}
          containerClassName="sm:w-96 w-72"
        />
        <Input
          placeholder="E-mail"
          type="email"
          disabled={isLoading}
          ref={emailRef}
          containerClassName="sm:w-96 w-72"
        />
        <Input
          placeholder="Password"
          type="password"
          disabled={isLoading}
          ref={passwordRef}
          containerClassName="sm:w-96 w-72"
        />
        <Input
          placeholder="Repeat password"
          type="password"
          disabled={isLoading}
          ref={repeatPasswordRef}
          containerClassName="sm:w-96 w-72"
        />
        <ThreeDots height={40} width={40} visible={isLoading} color="#c084fc" />
        <Button type="default" onClick={register} disabled={isLoading}>
          Register
        </Button>
        <Link to="/login">Already have an account? Login</Link>
      </div>
      <img
        src={background}
        className="xl:w-2/3 lg:w-1/2 hidden lg:block h-screen"
        alt=""
      />
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
