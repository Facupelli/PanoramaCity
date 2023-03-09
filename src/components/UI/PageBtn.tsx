import ArrowLeft from "~/icons/ArrowLeft";
import ArrowRight from "~/icons/ArrowRight";

type Props = {
  type: string;
  handleClick: () => void;
};

export default function PageBtn({ type, handleClick }: Props) {
  return (
    <button
      type="button"
      className="rounded border border-neutral-200 bg-white py-1 px-4"
      onClick={handleClick}
    >
      {type === "next" && <ArrowRight size={20} />}
      {type === "prev" && <ArrowLeft size={20} />}
    </button>
  );
}
