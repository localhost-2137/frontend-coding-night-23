import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../Atoms";
import toast from "react-hot-toast";
import { deleteCookie } from "../lib/cookie.ts";
import Nav from "../Components/Nav";
import logo from "./Assets/logo.png";

export default function Header() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  function logout() {
    deleteCookie("JWT_AUTH");
    deleteCookie("user_info");
    setUser({});
    toast.success("Logged out successfully!");
    navigate("/login");
    setTimeout(() => {
      window.location.reload();
    }, 750);
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
