import * as Antd from "antd";
import { FC } from "react";
import "./table.css";

interface TableProps extends Antd.TableProps {}

const Table: FC<TableProps> = ({ dataSource, ...props }) => {
  return dataSource ? (
    <Antd.Table dataSource={dataSource} {...props} />
  ) : (
    <div className="text-center">
      <Antd.Spin />
    </div>
  );
};

export default Table;
