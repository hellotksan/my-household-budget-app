import { useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../../lib/api";
import Link from "next/link";
import BudgetAppTitle from "../../components/title";

export default function Register() {
  const [date, setDate] = useState("");
  const [type_, setType_] = useState("収入");
  const [breakdown, setBreakdown] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/accountbooks", {
        date,
        type_,
        breakdown,
        price: parseInt(price, 10),
      });
      alert("登録が完了しました");
      router.push("/");
    } catch (error) {
      console.error("Error registering accountbook:", error);
      alert("登録中にエラーが発生しました");
    }
  };

  return (
    <>
      <BudgetAppTitle />
      <h1 className="text-2xl font-bold text-center my-4">帳簿登録</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">
            収入 or 支出:
            <select
              value={type_}
              onChange={(e) => {
                setType_(e.target.value);
              }}
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
            日付 (YYYY-MM-DD):
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            内訳:
            <input
              type="text"
              value={breakdown}
              onChange={(e) => setBreakdown(e.target.value)}
              required
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            金額:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          登録
        </button>
      </form>
      <div className="mt-6 text-center">
        <Link href="/">
          <span className="text-blue-500 hover:underline">戻る</span>
        </Link>
      </div>
      <br></br>
    </>
  );
}
