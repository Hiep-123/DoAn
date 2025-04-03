import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { getMonthlyRevenue } from "@/apis/paymentService";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RevenueChart = ({ year }) => {
    const [revenueData, setRevenueData] = useState([]);
    const chartRef = useRef(null);

    const handleGetMonthlyRevenue = async () => {
        try {
            const res = await getMonthlyRevenue(year);
            setRevenueData(res.data.monthlyRevenue);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleGetMonthlyRevenue();
    }, [year]);

    const data = {
        labels: revenueData.map(item => item.month),
        datasets: [
            {
                label: `Doanh thu năm ${year}`,
                data: revenueData.map(item => item.revenue),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Tắt tỷ lệ mặc định để có thể điều chỉnh kích thước
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,
                    },
                },
            },
            title: {
                display: true,
                text: `Biểu đồ Doanh Thu Năm ${year}`,
                font: {
                    size: 20,
                    weight: "bold",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: "80vw", height: "85vh", margin: "auto" }}>
            <Bar ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default RevenueChart;
