import { useState } from "react";

/**
 * Hook to get the cursor position on the screen.
 * @returns cursorPosition: { x: number; y: number; data?: T } | null
 * @returns handler: (data: T) => { onMouseEnter: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void; onMouseMove: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void; onMouseLeave: () => void; }
 *
 * @example
 * const { cursorPosition, handler } = useCursorPosition<{
 *  country: string;
 * population: number;
 * }>();
 *
 * return (
 *  <rect
 *   {...handler({ country: d.Country, population: d.Population })}
 * />
 * );
 * */
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
