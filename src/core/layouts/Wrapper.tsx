import { Toaster } from "sonner";
import { FC } from "react";

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen ali-class">
      <Toaster richColors />
      {children}
    </div>
  );
};

export default Wrapper;
