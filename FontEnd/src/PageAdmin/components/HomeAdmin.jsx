import { useState } from "react";
import ManageBooking from "./ManageBooking";
import ManageBrandCar from "./ManageBrandCar";
import ManageCar from "./ManageCar";
import ManagePayment from "./ManagePayment";
import ManageUsers from "./ManageUsers";
import { IoSettingsOutline } from "react-icons/io5";
import { TbBrandCarbon, TbBrandBooking } from "react-icons/tb";
import { BsCarFrontFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { LuUserRoundCog } from "react-icons/lu";
import { Dropdown } from "react-bootstrap"; // Import Bootstrap Dropdown

const menuItems = [
    {
        section: "Dashboards", items: [
            { name: "ManageBrandCar", icon: <TbBrandCarbon size={25} />, component: <ManageBrandCar /> },
            { name: "ManageCar", icon: <BsCarFrontFill size={25} />, component: <ManageCar /> },
            { name: "ManageBooking", icon: <TbBrandBooking size={25} />, component: <ManageBooking /> },
            { name: "ManagePayment", icon: <MdOutlinePayment size={25} />, component: <ManagePayment /> },
            { name: "ManageUsers", icon: <LuUserRoundCog size={25} />, component: <ManageUsers /> },

        ]
    },
];


export default function AdminDashboard() {
    const [selectedMenu, setSelectedMenu] = useState(menuItems[0].items[0].name);

    return (
        <div className="d-flex w-100">
            <aside className="sidebar bg-dark text-white vh-100 p-3 d-flex flex-column justify-content-between "
                style={{
                    width: '20%'
                }}>
                <h4 className="text-center mb-3 mt-3">Admin</h4>
                <ul className="nav d-flex flex-column gap-3 ">
                    {menuItems.map((group) => (
                        <div key={group.section}>
                            <p className="text-muted mt-3 mb-1">{group.section}</p>
                            {group.items.map((item) => (
                                <li
                                    key={item.name}
                                    className={`nav-item d-flex align-items-center px-4 py-3 rounded fs-5 mb-3 shadow-sm ${selectedMenu === item.name ? "bg-primary text-white shadow-lg" : "text-light"}`}
                                    onClick={() => setSelectedMenu(item.name)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span className="me-2">{item.icon}</span> {item.name}
                                </li>

                            ))}
                        </div>
                    ))}
                </ul>

                <div className="mt-3 d-flex justify-content-start align-items-center fs-4 gap-2 w-100">
                    <Dropdown drop="up">
                        <Dropdown.Toggle
                            variant="link"
                            className="text-white d-flex align-items-center border-0 shadow-none"
                            style={{ textDecoration: "none", cursor: "pointer" }}
                        >
                            <IoSettingsOutline size={25} /> <span className="ms-2 fs-4">Setting</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark" className="shadow " style={{ fontSize: "1.2rem", width: '100%', marginLeft: '130px' }}> {/* Tăng font-size */}
                            <Dropdown.Item href="/profile">👤 Profile</Dropdown.Item>
                            <Dropdown.Item href="/logout">🚪 Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </aside>
            <main className="main-content flex-grow-1 p-4">
                {menuItems.flatMap(group => group.items).find((item) => item.name === selectedMenu)?.component}
            </main>

        </div>
    );
}

