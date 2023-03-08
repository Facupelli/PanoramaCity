export const formatSurface = (surface: number) => {
  return surface.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
