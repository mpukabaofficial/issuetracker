import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <p>
      <Pagination currentPage={1} itemCount={100} pageSize={5} />
    </p>
  );
}
