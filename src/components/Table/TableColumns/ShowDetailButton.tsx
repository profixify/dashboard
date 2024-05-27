import { Link } from "react-router-dom";
import { IconButton } from "@/components/Button";
import { FaRightLong } from "react-icons/fa6";
import { FC } from "react";

interface ShowDetailButtonProps {
  url: string;
  uuid: string;
}

export const ShowDetailButton: FC<ShowDetailButtonProps> = ({ url, uuid }) => {
  return (
    <Link to={`${url}/${uuid}`}>
      <IconButton shape="circle" icon={<FaRightLong />} />
    </Link>
  );
};
