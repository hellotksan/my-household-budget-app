import { useState } from "react";
import apiClient from "../../lib/api";
import Link from "next/link";
import BudgetAppTitle from "../../components/title";

export default function Home() {
  const [editId, setEditId] = useState("");
  const [accountbook, setAccountbook] = useState(null);

  const handleFind = async () => {
    try {
      const response = await apiClient.get(`/accountbooks/${editId}`);
      if (response) {
        setAccountbook(response.data.accountbook);
      } else {
        alert("家計簿の取得に失敗しました");
      }
    } catch (error) {
      alert("APIの呼び出し時にエラーが発生しました");
      console.log(error);
      setAccountbook(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      date: formData.get("date"),
      type_: formData.get("type"),
      breakdown: formData.get("breakdown"),
      price: parseInt(formData.get("price"), 10),
    };

    try {
      const response = await apiClient.put(`/accountbooks/${editId}`, data);

      if (response.status === 204) {
        alert("帳簿を更新しました");
      } else {
        alert("帳簿の更新に失敗しました");
      }
    } catch (error) {
      alert("APIの呼び出し時にエラーが発生しました");
    }
  };

  return (
    <>
      <BudgetAppTitle />
      <h1 className="text-2xl font-bold text-center my-4">帳簿更新</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <input
          type="number"
          value={editId}
          onChange={(e) => setEditId(e.target.value)}
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
        <form
          onSubmit={handleUpdate}
          className="max-w-md mx-auto bg-white p-6 mt-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700">
              収入(1) or 支出(2):
              <select
                name="type"
                defaultValue={accountbook.type}
                required
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="収入">収入</option>
                <option value="支出">支出</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              日付:
              <input
                type="date"
                name="date"
                defaultValue={accountbook.date.split("T")[0]}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              内訳:
              <input
                type="text"
                name="breakdown"
                defaultValue={accountbook.breakdown}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              金額:
              <input
                type="number"
                name="price"
                defaultValue={accountbook.price}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            更新
          </button>
        </form>
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
