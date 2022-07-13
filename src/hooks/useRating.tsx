import { useState } from "react";

export const useRating = (isRating?: boolean) => {
  const [onRating, setOnRating] = useState(isRating);
  const [isCalified, setIsCalified] = useState<boolean>(false);

  const startRating = () => {
    setOnRating(true);
  };
  const closeRating = () => {
    setOnRating(false);
  };
  const startCalification = () => {
    setIsCalified(true);
  };

  return {
    onRating,
    isCalified,
    startRating,
    startCalification,
    closeRating,
  };
};
