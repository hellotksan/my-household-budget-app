import { useState } from "react";
import apiClient from "../../lib/api";
import Link from "next/link";

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
      <h1>帳簿更新</h1>
      <input
        type="number"
        value={editId}
        onChange={(e) => setEditId(e.target.value)}
        placeholder="IDを入力してください"
      />
      <button onClick={handleFind}>検索</button>

      {accountbook && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>
              収入(1) or 支出(2):
              <select name="type" required>
                <option value="収入">収入</option>
                <option value="支出">支出</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              日付:
              <input
                type="date"
                name="date"
                defaultValue={accountbook.date.split("T")[0]}
              />
            </label>
          </div>
          <div>
            <label>
              内訳:
              <input
                type="text"
                name="breakdown"
                defaultValue={accountbook.breakdown}
              />
            </label>
          </div>
          <div>
            <label>
              金額:
              <input
                type="number"
                name="price"
                defaultValue={accountbook.price}
              />
            </label>
          </div>
          <button type="submit">更新</button>
        </form>
      )}
      <div>
        <Link href={"/"}>戻る</Link>
      </div>
    </>
  );
}
