import { Link } from "react-router-dom";
import { FC } from "react";
import { PiArrowCircleRightDuotone } from "react-icons/pi";
import { Tooltip } from "antd";

interface ShowDetailButtonProps {
  url: string;
  uuid: string;
}

export const ShowDetailButton: FC<ShowDetailButtonProps> = ({ url, uuid }) => {
  return (
    <Link to={`${url}/${uuid}`}>
      <Tooltip title="Show Detail" color="blue">
        <PiArrowCircleRightDuotone className="text-2xl hover:text-blue-600" />
      </Tooltip>
    </Link>
  );
};
