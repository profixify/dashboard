import * as Antd from "antd";
import type { FC } from "react";

export interface ModalProps extends Antd.ModalProps {
  isLoading?: boolean;
  open: boolean;
  onCancel: () => void;
  title: string;
}

const Modal: FC<ModalProps> = ({
  isLoading,
  open,
  onCancel,
  title,
  children,
}) => {
  return (
    <Antd.Modal open={open} onCancel={onCancel} title={title} footer={false}>
      <Antd.Spin spinning={isLoading}>{children}</Antd.Spin>
    </Antd.Modal>
  );
};

export default Modal;
