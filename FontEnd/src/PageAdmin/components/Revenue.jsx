import React, { useState } from "react";
import RevenueChart from "./RevenueChart";

const Revenue = () => {
    const [year, setYear] = useState(2025); // Mặc định là năm 2025

    const handleYearChange = (event) => {
        setYear(parseInt(event.target.value, 10)); // Chuyển giá trị sang số nguyên
    };
console.log(year)
    return (
        <div>
            <h1>Doanh thu</h1>
            
            <div>
                <label htmlFor="yearSelect">Chọn năm: </label>
                <select id="yearSelect" value={year} onChange={handleYearChange}>
                    {[2023, 2024, 2025].map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {/* Biểu đồ doanh thu theo năm */}
            <RevenueChart year={year} />
        </div>
    );
};

export default Revenue;
