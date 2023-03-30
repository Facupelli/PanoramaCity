export default function Ruler({
  size,
  stroke,
}: {
  size: number;
  stroke: number;
}) {
  return (
    <svg
      width="30px"
      height="30px"
      strokeWidth={stroke}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
      className="rotate-90"
    >
      <path
        d="M16 7V2.6a.6.6 0 00-.6-.6H8.6a.6.6 0 00-.6.6v18.8a.6.6 0 00.6.6h6.8a.6.6 0 00.6-.6V17m0-10h-3m3 0v5m0 0h-3m3 0v5m0 0h-3"
        stroke="#000000"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
