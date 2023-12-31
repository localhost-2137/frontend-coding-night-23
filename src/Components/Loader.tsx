import { InfinitySpin } from "react-loader-spinner";

export default function Loader({ width }: { width: string }) {
  return <InfinitySpin width={width} color="#f59e0b" />;
}
