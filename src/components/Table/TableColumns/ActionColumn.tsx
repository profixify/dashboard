import { FC } from "react";
import { PiPencilSimpleDuotone, PiTrashDuotone } from "react-icons/pi";
import { Popconfirm } from "antd";

interface ActionColumnProps {
  uuid: string;
  openDrawer: () => void;
  onDelete: (uuid: string) => void;
  confirmTitle?: string;
  confirmDescription?: string;
}

export const ActionColumn: FC<ActionColumnProps> = ({
  uuid,
  openDrawer,
  onDelete,
  confirmTitle,
  confirmDescription,
}) => {
  return (
    <div className="flex gap-2">
      <button
        className="rounded-full p-1 hover:bg-gray-300"
        onClick={openDrawer}
      >
        <PiPencilSimpleDuotone className="text-xl" />
      </button>
      <Popconfirm
        title={confirmTitle ?? "Delete"}
        description={confirmDescription ?? "Are you sure to delete this record"}
        onConfirm={() => onDelete(uuid)}
        okText="Yes"
        cancelText="Cancel"
      >
        <button className="rounded-full p-1 hover:bg-gray-300">
          <PiTrashDuotone className="text-xl" />
        </button>
      </Popconfirm>
    </div>
  );
};
