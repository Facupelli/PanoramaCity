import React, { forwardRef } from "react";

const MapCanvas = forwardRef<HTMLDivElement, Record<string, unknown>>(
  (_, ref) => <div ref={ref} className="h-full w-full" />
);

MapCanvas.displayName = "MapCanvas";

export default MapCanvas;
