import Wrapper from "@/core/layouts/Wrapper.tsx";
import { cn } from "@/core/libs/utils";
import { Button, Card } from "antd";
import { FC } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PiPlusCircleDuotone } from "react-icons/pi";

interface ContentProps {
  children?: React.ReactNode;
  isFullPage?: boolean;
  title?: React.ReactNode;

  backButtonUrl?: string;
  addAction?: {
    title: string;
    onClick: () => void;
    disabled?: boolean;
  };
  editAction?: {
    title: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

const Content: FC<ContentProps> = ({
  children,
  isFullPage,
  title,
  backButtonUrl,
  addAction,
  editAction,
}) => {
  const _title = (
    <div className="flex items-center gap-2">
      {backButtonUrl && (
        <Link to={backButtonUrl}>
          <Button type="primary">
            <FaLeftLong />
          </Button>
        </Link>
      )}
      {title}
    </div>
  );
  const add = addAction ? (
    <Button
      className="flex items-center px-2"
      icon={<PiPlusCircleDuotone className="text-xl" />}
      onClick={addAction?.onClick}
      type="primary"
      disabled={addAction.disabled}
    >
      {addAction?.title}
    </Button>
  ) : undefined;
  const edit = editAction ? (
    <Button
      className="flex items-center gap-2"
      onClick={editAction?.onClick}
      type="primary"
      icon={<AiTwotoneEdit />}
      disabled={editAction.disabled}
    >
      {editAction.title}
    </Button>
  ) : undefined;
  const extra = (
    <>
      {add}
      {edit}
    </>
  );
  return (
    <Wrapper>
      <div
        className={cn(
          "p-5 w-full min-h-full bg-slate-200 overflow-x-scroll",
          isFullPage ? "h-screen" : undefined,
        )}
      >
        <Card
          title={_title}
          extra={extra}
          styles={{
            body: {
              overflowX: "scroll",
            },
          }}
        >
          {children}
        </Card>
      </div>
    </Wrapper>
  );
};

export default Content;
