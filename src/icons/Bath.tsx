export default function Bath({
  stroke,
  size,
}: {
  stroke: number;
  size: number;
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
        d="M21 13v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-2.4a.6.6 0 01.6-.6H21zM16 20l1 2M8 20l-1 2M21 13V7a4 4 0 00-4-4h-5"
        stroke="#000000"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M15.4 8H8.6c-.331 0-.596-.268-.56-.598C8.186 6.075 8.863 3 12 3s3.814 3.075 3.96 4.402c.036.33-.229.598-.56.598z"
        stroke="#000000"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
