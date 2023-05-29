import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

ChartJS.defaults.color = "white";

export default function BarChart({ stats })
{
    return (
        <Bar
            data={{
                labels: ["1 try", "2 tries", "3 tries", "4 tries", "5 tries", "6 tries"],
                datasets: [
                    {
                        data: [stats.one_try, stats.two_tries, stats.three_tries, stats.four_tries, stats.five_tries, stats.six_tries],
                        backgroundColor: Array(6).fill("#538d4e")
                    }
                ]
            }}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        grid: { display: false },
                        ticks: { precision: 0 }
                    }
                }
            }}
        />
    );
}