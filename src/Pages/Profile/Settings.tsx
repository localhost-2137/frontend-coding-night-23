import { motion, useIsPresent } from "framer-motion";
import { userAtom } from "../../Atoms";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarComponent from "../../Components/AvatarComponent";
import Input from "../../Components/Input";
import toast from "react-hot-toast";
import Button from "../../Components/Button";
import { TbDeviceFloppy } from "react-icons/tb";
import AvatarEditorModal from "./Components/AvatarEditorModal";

interface userData {
  username?: string;
  email?: string;
  description?: string;
  banner?: Blob;
  avatar?: Blob;
}

interface avatarOptions {
  scale?: number;
  rotate?: number;
}

export default function Settings() {
  const isPresent = useIsPresent();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<userData>();
  const [banner, setBanner] = useState<Blob>();
  const [avatarBlob, setAvatarBlob] = useState<Blob>();
  const [isUserEditingAvatar, setIsUserEditingAvatar] =
    useState<boolean>(false);
  const [avatarEditingOptions, setAvatarEditingOptions] =
    useState<avatarOptions>();

  const bannerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/user/settings/get`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status >= 400) {
            toast.error("Something went wrong!");
            navigate(`/profile/${user.id}`);
          } else {
            res.json().then((data) => {
              setUserData(data);
            });
          }
        })
        .catch((err) => {
          toast.error("Something went wrong!");
          navigate(`/profile/${user.id}`);
          console.log(err);
        });
    };

    const fetchBanner = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/user/settings/banner/${user.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status >= 400) {
            toast.error("Something went wrong!");
            navigate(`/profile/${user.id}`);
          } else {
            res.blob().then((data) => {
              if (data.size === 0) return;
              setBanner(data);
            });
          }
        })
        .catch((err) => {
          toast.error("Something went wrong!");
          navigate(`/profile/${user.id}`);
          console.log(err);
        });
    };

    fetchData();
    fetchBanner();
  }, [navigate, user.id]);

  function setBannerUrl(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Invalid file format! Only png and jpeg are allowed!");
      return;
    }
    setBanner(file);
  }

  function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Invalid file format! Only png and jpeg are allowed!");
      return;
    }
    setAvatarBlob(file);
    setIsUserEditingAvatar(true);
  }

  function saveData() {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (userData?.username === "" || userData?.email === "") {
      toast.error("Please fill all fields!");
      return;
    } else if (!emailRegex.test(userData?.email || "")) {
      toast.error("Invalid email!");
    }

    let avatarFile;
    if (avatarBlob) {
      avatarFile = new File([avatarBlob], "avatar.png", {
        type: "image/png",
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userDataCopy: any = { ...userData };

    if (banner && banner.size > 0) {
      userDataCopy.banner = banner;
    }
    userDataCopy.avatar = avatarFile;

    const correctFormdata = new FormData();

    for (const key in userDataCopy) {
      if (userDataCopy[key] instanceof File) {
        correctFormdata.append(key, userDataCopy[key], userDataCopy[key].name);
      } else {
        correctFormdata.append(key, userDataCopy[key]);
      }
    }

    fetch(`${import.meta.env.VITE_API_URL}/user/settings`, {
      method: "PATCH",
      credentials: "include",
      body: correctFormdata,
    })
      .then((res) => {
        if (res.status >= 400) {
          toast.error("Something went wrong!");
          return;
        } else {
          toast.success("Saves setting succesfully");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  }

  return (
    <div className="flex-1 flex justify-center overflow-x-auto py-8">
      {isUserEditingAvatar && (
        <AvatarEditorModal
          avatarEditingOptions={avatarEditingOptions}
          setIsUserEditingAvatar={setIsUserEditingAvatar}
          setAvatarEditingOptions={setAvatarEditingOptions}
          setAvatarBlob={setAvatarBlob}
          avatarBlob={avatarBlob}
        />
      )}
      <div className="flex w-4/5 xl:w-3/5 flex-col gap-8 box-border">
        <h1 className="text-center roboto text-gray-100 text-4xl mt-4">
          Settings
        </h1>
        <div className="flex gap-4 2xl:flex-row flex-col">
          <div className="flex flex-col 2xl:w-2/3 w-full gap-2">
            <div
              className={`flex items-center justify-center relative p-4 rounded-xl ${
                !banner && "bg-gradient-to-r from-violet-500 to-fuchsia-500"
              }`}
              style={
                banner
                  ? {
                      background: `url('${URL.createObjectURL(
                        banner
                      )}') no-repeat center center`,
                    }
                  : {}
              }
            >
              <div className="flex items-center flex-col gap-4 text-4xl roboto text-gray-100 drop-shadow-[0px_0px_8px_rgba(0,0,0,1)]">
                {!isUserEditingAvatar && avatarBlob ? (
                  <img
                    src={URL.createObjectURL(avatarBlob)}
                    alt="Img"
                    className="w-40 h-40 rounded-full"
                  />
                ) : (
                  <AvatarComponent
                    userId={+(user?.id || -10)}
                    username={userData?.username || ""}
                    size="big"
                  />
                )}
                {userData?.username}
              </div>
            </div>
            <div className="sm:flex-row flex-col flex items-center justify-around gap-4">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="banner"
                  className="text-xl roboto text-gray-400"
                >
                  Upload banner
                </label>
                <input
                  type="file"
                  className="quicksand block px-2.5 py-2.5 w-full text-lg text-white bg-transparent rounded-lg border-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600"
                  title="Upload banner"
                  accept="image/png, image/jpeg"
                  name="banner"
                  onChange={setBannerUrl}
                  defaultValue={banner ? URL.createObjectURL(banner) : ""}
                  ref={bannerRef}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="avatar"
                  className="text-xl roboto text-gray-400"
                >
                  Upload avatar
                </label>
                <input
                  type="file"
                  className="quicksand block px-2.5 py-2.5 w-full text-lg text-white bg-transparent rounded-lg border-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600"
                  title="Upload banner"
                  accept="image/png, image/jpeg"
                  name="avatar"
                  onChange={uploadAvatar}
                />
              </div>
            </div>
            <div className="flex w-full md:flex-row flex-col gap-4">
              <div className="2xl:hidden w-full flex flex-col gap-4">
                <Input
                  placeholder="Username"
                  value={userData?.username}
                  onChange={(e) => {
                    setUserData({ ...userData, username: e.target.value });
                  }}
                  className="w-full"
                />
                <Input
                  placeholder="E-Mail"
                  value={userData?.email}
                  type="email"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                  className="w-full"
                />
                <textarea
                  placeholder="Description"
                  defaultValue={userData?.description}
                  maxLength={300}
                  className="h-full max-h-72 block px-2.5 py-2.5 w-full text-lg text-white bg-transparent rounded-lg border-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600"
                  onChange={(e) => {
                    setUserData({ ...userData, description: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="2xl:flex w-1/2 hidden flex-col gap-4">
            <Input
              placeholder="Username"
              value={userData?.username}
              onChange={(e) => {
                setUserData({ ...userData, username: e.target.value });
              }}
              className="w-full"
            />
            <Input
              placeholder="E-Mail"
              value={userData?.email}
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserData({ ...userData, email: e.target.value });
              }}
              className="w-full"
            />
            <textarea
              placeholder="Description"
              defaultValue={userData?.description}
              className="h-full block px-2.5 py-2.5 w-full text-lg text-white bg-transparent rounded-lg border-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600"
              onChange={(e) => {
                setUserData({ ...userData, description: e.target.value });
              }}
            />
          </div>
          <Button
            type="default"
            width="2xl:hidden sm:w-1/4 w-full mb-8"
            onClick={saveData}
          >
            <TbDeviceFloppy />
            Save
          </Button>
        </div>
        <div className="flex gap-4 flex-row">
          <Button
            type="default"
            width="2xl:flex hidden w-1/4 mb-8"
            onClick={saveData}
          >
            <TbDeviceFloppy />
            Save
          </Button>
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: 0,
          transition: { duration: 0.6, ease: "circOut" },
        }}
        exit={{ scaleX: 1, transition: { duration: 0.6, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen z-50"
      />
    </div>
  );
}
