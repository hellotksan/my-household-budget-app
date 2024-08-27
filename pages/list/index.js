import { useState } from "react";
import apiClient from "../../lib/api";
import Link from "next/link";
import AccountbooksPieChart from "../../components/piechart/index";

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
      <h1>家計簿を表示</h1>
      <form onSubmit={handleSubmit}>
        <label>
          年月を指定:
          <input
            type="month"
            value={yearMonth}
            onChange={(e) => setYearMonth(e.target.value)}
            required
          />
        </label>
        <button type="submit">表示</button>
      </form>

      <div>
        <h2>家計簿の結果</h2>
        {accountbooks.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>年月日</th>
                  <th>種別</th>
                  <th>内訳</th>
                  <th>金額</th>
                </tr>
              </thead>
              <tbody>
                {accountbooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.date}</td>
                    <td>{book.type}</td>
                    <td>{book.breakdown}</td>
                    <td>¥{book.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <h2>合計</h2>
              <p>収入の合計: ¥{incomeTotal.toLocaleString()}</p>
              <p>支出の合計: ¥{expenseTotal.toLocaleString()}</p>
              <p>収支の合計: ¥{balance.toLocaleString()}</p>
            </div>

            <AccountbooksPieChart accountbooks={accountbooks} />
          </>
        ) : (
          <p>該当する家計簿はありません</p>
        )}
      </div>
      <div>
        <Link href={"/"}>戻る</Link>
      </div>
    </>
  );
}
