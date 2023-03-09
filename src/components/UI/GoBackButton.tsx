import { useRouter } from "next/router";
import ArrowLeft from "~/icons/ArrowLeft";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button aria-label="go-back-button" onClick={() => router.back()}>
      <ArrowLeft />
    </button>
  );
}
