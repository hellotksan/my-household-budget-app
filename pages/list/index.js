import { useState } from "react";
import apiClient from "../../lib/api";
import Link from "next/link";
import AccountbooksPieChart from "../../components/piechart/index";
import BudgetAppTitle from "../../components/title";

export default function Accountbooks() {
  let [yearMonth, setYearMonth] = useState("");
  const [accountbooks, setAccountbooks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    yearMonth += "-01";

    try {
      const response = await apiClient.get(`/accountbooks?date=${yearMonth}`);
      setAccountbooks(response.data.accountbooks);
    } catch (err) {
      console.error("Error fetching accountbooks:", err);
      alert("家計簿の取得に失敗しました");
    }
  };

  const calculateTotals = (books) => {
    const incomeTotal = books
      .filter((book) => book.type === "収入")
      .reduce((sum, book) => sum + book.price, 0);

    const expenseTotal = books
      .filter((book) => book.type === "支出")
      .reduce((sum, book) => sum + book.price, 0);

    const balance = incomeTotal - expenseTotal;

    return { incomeTotal, expenseTotal, balance };
  };

  const { incomeTotal, expenseTotal, balance } = calculateTotals(accountbooks);

  return (
    <>
      <BudgetAppTitle />
      <h1 className="text-2xl font-bold text-center my-4">家計簿を表示</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
      >
        <label className="block text-gray-700 mb-4">
          年月を指定:
          <input
            type="month"
            value={yearMonth}
            onChange={(e) => setYearMonth(e.target.value)}
            required
            className="block w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          表示
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-center">家計簿の結果</h2>
        {accountbooks.length > 0 ? (
          <>
            <table className="min-w-full bg-white border border-gray-200 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">年月日</th>
                  <th className="py-2 px-4 border-b">種別</th>
                  <th className="py-2 px-4 border-b">内訳</th>
                  <th className="py-2 px-4 border-b">金額</th>
                </tr>
              </thead>
              <tbody>
                {accountbooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{book.id}</td>
                    <td className="py-2 px-4 border-b">{book.date}</td>
                    <td className="py-2 px-4 border-b">{book.type}</td>
                    <td className="py-2 px-4 border-b">{book.breakdown}</td>
                    <td className="py-2 px-4 border-b">
                      ¥{book.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-center">
              <h2 className="text-lg font-semibold">合計</h2>
              <p className="mt-2">
                収入の合計: ¥{incomeTotal.toLocaleString()}
              </p>
              <p>支出の合計: ¥{expenseTotal.toLocaleString()}</p>
              <p className="font-bold">
                収支の合計: ¥{balance.toLocaleString()}
              </p>
            </div>

            <AccountbooksPieChart accountbooks={accountbooks} />
          </>
        ) : (
          <p className="text-center text-red-500">該当する家計簿はありません</p>
        )}
      </div>
      <div className="mt-6 text-center">
        <Link href={"/"}>
          <span className="text-blue-500 hover:underline">戻る</span>
        </Link>
      </div>
      <br></br>
    </>
  );
}
