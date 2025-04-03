import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { getMonthlyRevenue } from "@/apis/paymentService";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
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
    const chartRef = useRef(null);  // Lưu trữ chart instance

    const handleGetMonthlyRevenue = async () => {
        try {
            const res = await getMonthlyRevenue(year);
            setRevenueData(res.data.monthlyRevenue); // Lấy dữ liệu từ monthlyRevenue
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleGetMonthlyRevenue();
    }, [year]);

    useEffect(() => {
        const chartInstance = chartRef.current;

        // Cleanup chart cũ trước khi vẽ lại
        if (chartInstance && chartInstance.chart) {
            chartInstance.chart.destroy(); // Hủy chart cũ
        }

        return () => {
            if (chartInstance && chartInstance.chart) {
                chartInstance.chart.destroy(); // Cleanup khi unmount
            }
        };
    }, [year]);

    const data = {
        labels: revenueData.map(item => item.month), // Tháng
        datasets: [
            {
                label: `Doanh thu năm ${year}`,
                data: revenueData.map(item => item.revenue), // Doanh thu mỗi tháng
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                type: 'linear', // Chỉ rõ kiểu scale cho trục Y
            },
        },
    };

    return (
        <div>
            <h2>Biểu đồ Doanh Thu {year}</h2>
            <Bar ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default RevenueChart;
