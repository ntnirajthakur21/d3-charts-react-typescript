import { useState } from "react";

const useCursorPosition = <T>() => {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
    data?: T;
  } | null>(null);

  const handler = (data: T) => {
    return {
      onMouseEnter: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        const { pageX, pageY } = event;
        setCursorPosition({ x: pageX, y: pageY, data });
      },
      onMouseMove: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        const { pageX, pageY } = event;
        setCursorPosition({ x: pageX + 10, y: pageY + 10, data });
      },
      onMouseLeave: () => {
        setCursorPosition(null);
      },
    };
  };

  return { cursorPosition, handler };
};

export default useCursorPosition;
