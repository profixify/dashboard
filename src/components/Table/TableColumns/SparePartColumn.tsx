import { SparePartType } from "@/pages/SparePart/types.ts";
import { FC } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/core/consts/urls.ts";

interface SparePartColumnProps extends SparePartType {
  isLinked?: boolean;
}

export const SparePartColumn: FC<SparePartColumnProps> = ({
  uuid,
  name,
  isLinked,
}) => {
  return isLinked ? (
    <Link className="text-blue-500" to={`${URLS.SPARE_PART}/${uuid}/`}>
      {name}
    </Link>
  ) : (
    <span>{name}</span>
  );
};
