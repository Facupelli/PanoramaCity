import Heart from "~/icons/Heart";

type Props = {
  size: number;
  border?: boolean;
};

export default function FavButton({ size, border }: Props) {
  return (
    <button
      aria-label="fav-button"
      className={`rounded-full  p-1 text-sm font-semibold text-m-black ${
        border ? "border border-neutral-400" : ""
      }`}
    >
      <Heart size={size} />
    </button>
  );
}
