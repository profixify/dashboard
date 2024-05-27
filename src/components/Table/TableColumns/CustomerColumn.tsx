import { CustomerType } from "@/pages/Customer/types.ts";
import { FC } from "react";
import { Link } from "react-router-dom";
import { URLS } from "@/core/consts/urls.ts";
interface CustomerColumnProps extends CustomerType {
  isLinked?: boolean;
}
export const CustomerColumn: FC<CustomerColumnProps> = ({
  uuid,
  fullName,
  isLinked,
}) => {
  return (
    <div>
      {isLinked ? (
        <Link className="text-blue-500" to={`${URLS.CUSTOMER}/${uuid}/`}>
          {fullName}
        </Link>
      ) : (
        <span>{fullName}</span>
      )}
    </div>
  );
};
