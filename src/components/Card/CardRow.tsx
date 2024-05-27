import { FC } from "react";

interface CardRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export const CardRow: FC<CardRowProps> = ({ label, value }) => {
  return (
    <div className="flex gap-2 items-center">
      <label className="text-gray-400">{label}:</label>
      <span className="font-semibold">{value}</span>
    </div>
  );
};
