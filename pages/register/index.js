import { useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../../lib/api";
import Link from "next/link";

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
      <h1>帳簿登録</h1>
      <form onSubmit={handleSubmit}>
        <label>
          収入 or 支出:
          <select
            value={type_}
            onChange={(e) => {
              setType_(e.target.value);
            }}
            required
          >
            <option value="収入">収入</option>
            <option value="支出">支出</option>
          </select>
        </label>
        <br />
        <label>
          日付 (YYYY-MM-DD):
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          内訳:
          <input
            type="text"
            value={breakdown}
            onChange={(e) => setBreakdown(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          金額:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">登録</button>
      </form>
      <div>
        <Link href={"/"}>戻る</Link>
      </div>
    </>
  );
}
