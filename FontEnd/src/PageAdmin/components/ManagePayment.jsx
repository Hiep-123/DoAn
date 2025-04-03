import React, { useState, useEffect, useContext } from "react";
import { getPayments, createPayment, updatePayment, deletePayment, getDetailPayment } from "@/apis/paymentService";
import { ToastContext } from "@/context/ToastProvider";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ManagePayment = () => {
    const [payments, setPayments] = useState([]);
    const [detailPayments, setDetailPayments] = useState([]);
    const [paymentData, setPaymentData] = useState({
        name: "",
        userId: "",
        bookingId: "",
        method: "cash",
        paymentStatus: "pending",
    });
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const { toast } = useContext(ToastContext);
    const [totalRevenue, setTotalRevenue] = useState(0); // Thêm state cho tổng doanh thu

    useEffect(() => {
        fetchPayments();
        fetchDetailPayment();
    }, []);

    const fetchDetailPayment = async () => {
        try {
            await getDetailPayment().then((res) => {
                setDetailPayments(res.data);
                calculateTotalRevenue(res.data); // Tính tổng doanh thu mỗi khi cập nhật danh sách chi tiết payment
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPayments = async () => {
        try {
            // Gọi API lấy danh sách payments
            const response = await getPayments(); // Lấy toàn bộ response từ API
            const paymentsData = response.data; // Truy cập vào trường `data` để lấy mảng payments

            if (!Array.isArray(paymentsData)) {
                console.error("Dữ liệu trả về từ API /payments không phải là mảng:", paymentsData);
                throw new Error("API /payments không trả về mảng");
            }

            setPayments(paymentsData); // Cập nhật danh sách payments
        } catch (error) {
            console.error("Lỗi khi tải danh sách payments:", error);
            toast.error("Lỗi khi tải danh sách payments!");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isAdding) {
                await createPayment(paymentData); // Gọi API thêm payment
                toast.success("Thêm payment thành công!");
            } else {
                await updatePayment(editingId, paymentData); // Gọi API cập nhật payment
                toast.success("Cập nhật payment thành công!");
            }
            setShowModal(false);
            fetchPayments(); // Tải lại danh sách payments
        } catch (error) {
            toast.error("Lỗi khi lưu payment!");
        }
    };

    const handleDelete = async () => {
        try {
            await deletePayment(deleteId); // Gọi API xóa payment
            toast.success("Xóa payment thành công!");
            setShowDeleteModal(false);
            fetchPayments(); // Tải lại danh sách payments
        } catch (error) {
            toast.error("Lỗi khi xóa payment!");
        }
    };

    // Hàm tính tổng doanh thu
    const calculateTotalRevenue = (detailPayments) => {
        let total = 0;
        detailPayments.forEach(detail => {
            total += detail.totalAmount || 0; // Cộng tổng tiền (totalAmount) của mỗi payment
        });
        setTotalRevenue(total); // Cập nhật tổng doanh thu
    };

    return (
        <div className="container-fluid mt-4">
            <h2 className="text-center fs-3 mb-3">Quản lý Payments</h2>
            {/* Hiển thị tổng doanh thu */}
            <div className="d-flex justify-content-end mt-4 mb-3">
                <h4>Tổng Doanh Thu: {totalRevenue} $</h4>
            </div>
            <div className="d-flex justify-content-end mt-4 mb-3">
            </div>
            <div className="table-responsive">
                <table className="table table-bordered w-100">
                    <thead>
                        <tr className="fs-4 text-center">
                            <th>STT</th>
                            <th>Người dùng</th>
                            <th>Booking</th>
                            <th>Số lượng xe</th>
                            <th>Tổng tiền</th>
                            <th>Phương thức</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td className="fs-5 text-center">{index + 1}</td>
                                <td className="fs-5">
                                    {typeof payment.userId === "object" ? payment.userId.name || payment.userId._id : payment.userId}
                                </td>
                                <td className="fs-5">
                                    {typeof payment.bookingId === "object" ? payment.bookingId._id : payment.bookingId}
                                </td>
                                <td className="fs-5">{detailPayments.find(detailPayment => payment._id === detailPayment.paymentId)?.amountCar || "Không xác định"}</td>
                                <td className="fs-5">{detailPayments.find(detailPayment => payment._id === detailPayment.paymentId)?.totalAmount || "Không xác định"} $</td>
                                <td className="fs-5">{payment.method}</td>
                                <td className="fs-5">{payment.paymentStatus}</td>
                                <td className="d-flex justify-content-around">
                                    <button
                                        className="btn btn-warning fs-5"
                                        onClick={() => {
                                            setPaymentData({
                                                name: typeof payment.userId === "object" ? payment.userId.name : payment.userId,
                                                userId: typeof payment.userId === "object" ? payment.userId._id : payment.userId,
                                                bookingId: typeof payment.bookingId === "object" ? payment.bookingId._id : payment.bookingId,
                                                method: payment.method,
                                                paymentStatus: payment.paymentStatus,
                                            });
                                            setEditingId(payment._id);
                                            setIsAdding(false);
                                            setShowModal(true);
                                        }}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-danger fs-5"
                                        onClick={() => {
                                            setDeleteId(payment._id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm / Sửa */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{isAdding ? "Thêm Payment" : "Chỉnh Sửa Payment"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Người dùng</Form.Label>
                            <Form.Control
                                type="text"
                                value={paymentData.name}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Booking</Form.Label>
                            <Form.Control
                                type="text"
                                value={paymentData.bookingId}
                                onChange={(e) => setPaymentData({ ...paymentData, bookingId: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phương thức</Form.Label>
                            <Form.Select
                                value={paymentData.method}
                                onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
                            >
                                <option value="cash">Cash</option>
                                <option value="transfer">Transfer</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                value={paymentData.paymentStatus}
                                onChange={(e) => setPaymentData({ ...paymentData, paymentStatus: e.target.value })}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="success">
                            Lưu
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal Xóa */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa payment này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManagePayment;
