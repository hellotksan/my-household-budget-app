import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>家計簿アプリケーション</h1>
      <div>
        <Link href={"/selectall"}>全件表示</Link>
      </div>
      <div>
        <Link href={"/register"}>登録</Link>
      </div>
      <div>
        <Link href={"/list"}>年月で指定して家計簿を表示</Link>
      </div>
      <div>
        <Link href={"/update"}>更新</Link>
      </div>
      <div>
        <Link href={"/delete"}>削除</Link>
      </div>
    </>
  );
}
