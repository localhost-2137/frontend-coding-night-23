import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../Atoms";
import toast from "react-hot-toast";
import Nav from "../Components/Nav";
import logo from "./Assets/logo.png";

export default function Header() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  function logout() {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      toast.success("Logged out successfully!");
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 750);
    });
  }

  return (
    <>
      <header className="w-screen border-b-2 border-amber-600 flex justify-between items-center sm:px-8 px-4 py-4">
        <Link to="/" className="flex items-center w-fit gap-4">
          <img src={logo} alt="" className="w-12" />
          <h1 className="roboto text-3xl">Home Lord</h1>
        </Link>
        <Nav user={user} logout={logout} />
      </header>
      <Outlet />
    </>
  );
}
