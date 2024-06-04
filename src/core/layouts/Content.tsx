import Wrapper from "@/core/layouts/Wrapper.tsx";
import { cn } from "@/core/libs/utils";
import { Button, Card } from "antd";
import { FC } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaLeftLong, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ContentProps {
  children?: React.ReactNode;
  isFullPage?: boolean;
  title?: React.ReactNode;

  backButtonUrl?: string;
  addAction?: {
    title: string;
    onClick: () => void;
  };
  editAction?: {
    title: string;
    onClick: () => void;
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
      className="flex items-center gap-2"
      icon={<FaPlus />}
      onClick={addAction?.onClick}
      type="primary"
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
          isFullPage ? "h-screen" : undefined
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
