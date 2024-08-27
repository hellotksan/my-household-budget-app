import { useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../../lib/api";
import Link from "next/link";

export default function DeleteAccountbook() {
  const [deleteId, setDeleteId] = useState("");
  const [accountbook, setAccountbook] = useState(null);
  const router = useRouter();

  const handleFind = async () => {
    try {
      const response = await apiClient.get(`/accountbooks/${deleteId}`);
      if (response.status === 200) {
        setAccountbook(response.data.accountbook);
      } else if (response.status === 404) {
        alert("指定したIDの家計簿は存在しません");
        window.location.reload();
      } else {
        alert("家計簿の取得に失敗しました");
      }
    } catch (error) {
      alert("APIの呼び出し時にエラーが発生しました");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/accountbooks/${deleteId}`);
      if (response.status === 204) {
        alert("帳簿を削除しました");
        setAccountbook(null);
        setDeleteId("");
        router.push("/");
      } else {
        alert("家計簿の削除に失敗しました");
      }
    } catch (error) {
      alert("APIの呼び出し時にエラーが発生しました");
    }
  };

  return (
    <>
      <h1>帳簿削除</h1>
      <input
        type="number"
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
        placeholder="IDを入力してください"
      />
      <button onClick={handleFind}>検索</button>

      {accountbook && (
        <div>
          <h2>削除対象の帳簿</h2>
          <p>ID: {accountbook.id}</p>
          <p>年月日: {accountbook.date}</p>
          <p>種別: {accountbook.type}</p>
          <p>内訳: {accountbook.breakdown}</p>
          <p>金額: ¥{accountbook.price.toLocaleString()}</p>
          <button onClick={handleDelete}>削除</button>
        </div>
      )}
      <div>
        <Link href={"/"}>戻る</Link>
      </div>
    </>
  );
}
