import {
  TbHome,
  TbLogin2,
  TbLogout,
  TbNotebook,
  TbX,
  TbMenu2,
  TbDoor,
} from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AvatarComponent from "./AvatarComponent";
import Button from "./Button";

const navigationLinks = [
  { to: "/home-scheme", label: "Home Scheme", icon: TbHome },
  { to: "/rooms", label: "Rooms", icon: TbDoor },
  { to: "/plan", label: "Plan", icon: TbNotebook },
];

export default function Nav({
  user,
  logout,
}: {
  user: { email: string; id: string, firstname: string, lastname: string };
  logout: () => void;
}) {
  const [isShown, setIsShown] = useState(false);

  const menuLinkClass = (isActive: boolean) => {
    return `rounded-full px-4 link flex items-center gap-2 text-center transition-all ${
      isActive ? "text-slate-200 !bg-left" : "text-gray-400 bg-bgLght !bg-right"
    }`;
  };

  return (
    <>
      <nav className="2xl:flex flex-row hidden roboto uppercase items-center min-[1700px]:gap-8 gap-4 min-[1700px]:text-2xl text-xl h-8">
        {navigationLinks.map((link, index) => (
          <Fragment key={link.to}>
            <NavLink
              className={({ isActive }) => menuLinkClass(isActive)}
              to={link.to}
            >
              <link.icon />
              {link.label}
            </NavLink>
            {index < navigationLinks.length - 1 && (
              <div className="w-1 rounded-xl h-full bg-bgLght" />
            )}
          </Fragment>
        ))}
      </nav>
      <div
        onClick={() => setIsShown(true)}
        className="roboto uppercase 2xl:hidden flex items-center gap-4 cursor-pointer text-2xl text-gray-400 hover:text-gray-100 transition-colors duration-200"
      >
        <p className="sm:block hidden">Open menu</p>
        <TbMenu2 />
      </div>
      {user.firstname ? (
        <div className="hidden lg:flex items-center gap-8 roboto text-3xl">
          <span className="flex items-center gap-2">
            <AvatarComponent
              userId={+(user.id || -10)}
              username={user.email}
              size="small"
            />
            <p className="max-w-[200px] text-ellipsis overflow-hidden text-gray-100">
              {user.firstname + " " + user.lastname}
            </p>
          </span>
          <Button
            type="default"
            className="roboto text-center"
            width="w-36"
            onClick={logout}
          >
            Logout
            <TbLogout />
          </Button>
        </div>
      ) : (
        <Button
          type="default"
          isLink
          to="/login"
          className="roboto text-center lg:flex hidden"
          width="w-48"
        >
          Login
          <TbLogin2 />
        </Button>
      )}
      <AnimatePresence>
        {isShown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="2xl:hidden fixed w-screen h-screen top-0 left-0 block bg-bgClr opacity-40"
          />
        )}
      </AnimatePresence>
      <nav
        className={`z-50 2xl:hidden flex-col md:border-amber-500 border-transparent border-l-2 flex roboto uppercase items-center justify-center gap-8 text-2xl xl:w-1/4 lg:w-1/3 md:w-1/2 w-screen h-screen fixed top-0 duration-300 ${
          isShown
            ? "right-0 "
            : "xl:-right-1/4 lx:-right-1/3 md:-right-1/2 -right-full"
        } bg-bgClr transition-all`}
      >
        <div
          onClick={() => setIsShown(false)}
          className="roboto flex items-center gap-4 cursor-pointer text-2xl text-gray-400 hover:text-gray-100 transition-colors duration-200"
        >
          Close
          <TbX />
        </div>
        <NavLink className={({ isActive }) => menuLinkClass(isActive)} to="/">
          <TbHome />
          Home
        </NavLink>
        {navigationLinks.map((link) => (
          <NavLink
            className={({ isActive }) => menuLinkClass(isActive)}
            to={link.to}
            key={link.to}
          >
            <link.icon />
            {link.label}
          </NavLink>
        ))}
        {user.email ? (
          <div className="lg:hidden flex flex-col items-center gap-8 roboto text-3xl">
            <span className="flex items-center gap-2">
              <AvatarComponent
                userId={+(user.id || -10)}
                username={user.email}
                size="small"
              />
              <p className="max-w-[250px] text-ellipsis overflow-hidden">
                {user.email}
              </p>
            </span>
            <Button
              type="default"
              className="roboto text-center"
              width="w-36"
              onClick={logout}
            >
              Logout
              <TbLogout />
            </Button>
          </div>
        ) : (
          <Button
            type="default"
            isLink
            to="/login"
            className="roboto text-center lg:hidden flex"
            width="w-48"
          >
            Login
            <TbLogin2 />
          </Button>
        )}
      </nav>
    </>
  );
}
