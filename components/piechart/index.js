import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const generatePieChartData = (books, type) => {
  const filteredBooks = books.filter((book) => book.type === type);
  const labels = [...new Set(filteredBooks.map((book) => book.breakdown))];
  const data = labels.map((label) =>
    filteredBooks
      .filter((book) => book.breakdown === label)
      .reduce((sum, book) => sum + book.price, 0)
  );

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

export default function AccountbooksPieCharts({ accountbooks }) {
  const incomeData = useMemo(
    () => generatePieChartData(accountbooks, "収入"),
    [accountbooks]
  );
  const expenseData = useMemo(
    () => generatePieChartData(accountbooks, "支出"),
    [accountbooks]
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ width: "45%" }}>
        <h2>収入の円グラフ</h2>
        <Pie
          data={incomeData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `¥${context.raw.toLocaleString()} (${context.label})`,
                },
              },
            },
          }}
        />
      </div>
      <div style={{ width: "45%" }}>
        <h2>支出の円グラフ</h2>
        <Pie
          data={expenseData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `¥${context.raw.toLocaleString()} (${context.label})`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
