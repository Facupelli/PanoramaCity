export default function Bed({
  size,
  stroke,
}: {
  size: number;
  stroke: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M21 4v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2z"
        stroke="#000000"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 8h8V6M21 8h-8V6"
        stroke="#000000"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
