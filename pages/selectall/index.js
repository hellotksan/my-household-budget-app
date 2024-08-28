import apiClient from "../../lib/api";
import { useState, useEffect } from "react";
import Link from "next/link";
import BudgetAppTitle from "../../components/title";

export default function Selectall() {
  const [accountbooks, setAccountbooks] = useState([]);

  useEffect(() => {
    apiClient
      .get("/accountbooks/all")
      .then((response) => {
        setAccountbooks(response.data["accountbooks"]);
      })
      .catch((error) => {
        console.error("Error fetching accountbooks:", error);
      });
  }, []);

  return (
    <>
      <BudgetAppTitle />
      <h1 className="text-2xl font-bold text-center my-4">家計簿一覧</h1>
      {accountbooks.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">日付</th>
              <th className="py-2 px-4 border-b">タイプ</th>
              <th className="py-2 px-4 border-b">内訳</th>
              <th className="py-2 px-4 border-b">価格</th>
            </tr>
          </thead>
          <tbody>
            {accountbooks.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{entry.date}</td>
                <td className="py-2 px-4 border-b text-center">{entry.type}</td>
                <td className="py-2 px-4 border-b text-center">
                  {entry.breakdown}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {entry.price}円
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">データがありません</p>
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
