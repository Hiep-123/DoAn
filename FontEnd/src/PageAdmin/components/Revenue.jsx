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
            <div className="d-flex justify-content-start align-items-center ">
                <div className="d-flex justify-content-start fs-3 my-3">
                    <label htmlFor="yearSelect" className="me-2 fw-bold">
                        Chọn năm:
                    </label>
                    <select
                        id="yearSelect"
                        className="form-select w-auto"
                        value={year}
                        onChange={handleYearChange}
                    >
                        {[2023, 2024, 2025].map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Biểu đồ doanh thu theo năm */}
            <RevenueChart year={year} />
        </div>
    );
};

export default Revenue;
