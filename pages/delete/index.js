import { useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../../lib/api";
import Link from "next/link";
import BudgetAppTitle from "../../components/title";

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
    const isConfirmed = window.confirm("本当に削除してもよろしいですか？");
    if (!isConfirmed) return;

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
      <BudgetAppTitle />
      <h1 className="text-2xl font-bold text-center my-4">帳簿削除</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <input
          type="number"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          placeholder="IDを入力してください"
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleFind}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          検索
        </button>
      </div>

      {accountbook && (
        <div className="max-w-md mx-auto bg-white p-6 mt-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">削除対象の帳簿</h2>
          <p className="mb-2">ID: {accountbook.id}</p>
          <p className="mb-2">年月日: {accountbook.date}</p>
          <p className="mb-2">種別: {accountbook.type}</p>
          <p className="mb-2">内訳: {accountbook.breakdown}</p>
          <p className="mb-4">金額: ¥{accountbook.price.toLocaleString()}</p>
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            削除
          </button>
        </div>
      )}
      <div className="mt-6 text-center">
        <Link href="/">
          <span className="text-blue-500 hover:underline">戻る</span>
        </Link>
      </div>
      <br></br>
    </>
  );
}
