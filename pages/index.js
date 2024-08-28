import Link from "next/link";
import BudgetAppTitle from "../components/title";

export default function Home() {
  return (
    <>
      <BudgetAppTitle />
      <br></br>
      <div>
        <span className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          <Link href={"/selectall"}>全件表示</Link>
        </span>
      </div>
      <br></br>
      <div>
        <span className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
          <Link href={"/register"}>登録</Link>
        </span>
      </div>
      <br></br>
      <div>
        <span className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">
          <Link href={"/list"}>年月で指定して家計簿を表示</Link>
        </span>
      </div>
      <br></br>
      <div>
        <span className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
          <Link href={"/update"}>更新</Link>
        </span>
      </div>
      <br></br>
      <div>
        <span className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
          <Link href={"/delete"}>削除</Link>
        </span>
      </div>
    </>
  );
}
