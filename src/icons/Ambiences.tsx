export default function Ambiences({ stroke }: { stroke: number }) {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M11 19v2M11 12v4M16 12v4h-2M21 12H8M5 12H3M3 5l9-2 9 2"
        stroke="#000000"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M21 8.6v11.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V8.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z"
        stroke="#000000"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
