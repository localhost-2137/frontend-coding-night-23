import { useState, useCallback, useEffect } from "react";
import Avatar from "react-avatar";
import { ColorRing } from "react-loader-spinner";

export default function AvatarComponent(props: {
  userId: number;
  className?: string;
  username: string;
  size: "small" | "big";
}): JSX.Element {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [avatarSize, setAvatarSize] = useState<number>(64);

  const getAvatarUrl = useCallback(async (): Promise<void> => {
    fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/user/settings/avatar/${
        props.userId
      }`,
      {
        credentials: "include",
        method: "GET",
      }
    )
      .then((res: Response) => {
        if (!res.ok || res.status === 204) throw new Error();
        return res.blob();
      })
      .then((blob) => setAvatarUrl(URL.createObjectURL(blob)))
      .catch(() => setAvatarUrl(""))
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.userId]);

  useEffect(() => {
    getAvatarUrl();
    function calculateAvatarSize(): void {
      if (props.size === "small") {
        setAvatarSize(32);
      } else {
        setAvatarSize(288);
      }
    }
    calculateAvatarSize();
  }, [getAvatarUrl, props.size, props.userId]);

  return (
    <>
      {isLoading ? (
        <ColorRing
          visible={true}
          width={avatarSize}
          height={avatarSize}
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="rounded-full"
          colors={["#a7f3d0", "#2dd4bf", "#ADB5BD", "#F8F9FA", "#10b981"]}
        />
      ) : avatarUrl ? (
        <img
          className={props.className}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: "100%",
          }}
          src={avatarUrl}
          alt="User's avatar"
        />
      ) : (
        <Avatar name={props.username} size={String(avatarSize)} round={true} />
      )}
    </>
  );
}
