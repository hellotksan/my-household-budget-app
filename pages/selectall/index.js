import apiClient from "../../lib/api";
import { useState, useEffect } from "react";
import Link from "next/link";

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
      <h1>家計簿一覧</h1>
      {accountbooks.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>日付</th>
              <th>タイプ</th>
              <th>内訳</th>
              <th>価格</th>
            </tr>
          </thead>
          <tbody>
            {accountbooks.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.type}</td>
                <td>{entry.breakdown}</td>
                <td>{entry.price}円</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>データがありません</p>
      )}
      <div>
        <Link href={"/"}>戻る</Link>
      </div>
    </>
  );
}
