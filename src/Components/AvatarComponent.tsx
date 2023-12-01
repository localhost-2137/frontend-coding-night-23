import { useState, useEffect } from "react";
import Avatar from "react-avatar";

export default function AvatarComponent(props: {
  userId: number;
  className?: string;
  username: string;
  size: "small" | "big";
}): JSX.Element {
  const [avatarSize, setAvatarSize] = useState<number>(64);

  useEffect(() => {
    function calculateAvatarSize(): void {
      if (props.size === "small") {
        setAvatarSize(32);
      } else {
        setAvatarSize(288);
      }
    }
    calculateAvatarSize();
  }, [props.size, props.userId]);

  return (
    <Avatar name={props.username} size={String(avatarSize)} round={true} />
  );
}
