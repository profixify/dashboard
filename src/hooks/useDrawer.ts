import { useState } from "react";

export const useDrawer = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return { isOpen, openDrawer, closeDrawer };
};
