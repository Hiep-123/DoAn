
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getBookings, createBooking, updateBooking, deleteBooking } from "@/apis/bookingService";

const ManageBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [bookingData, setBookingData] = useState(initialBookingState());
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await getBookings();
            console.log("Bookings data:", data); // Kiểm tra dữ liệu trả về
            setBookings(data);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
            alert("Lỗi khi tải danh sách bookings!");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isAdding) {
                await createBooking(bookingData);
                alert("Thêm booking thành công!");
            } else {
                await updateBooking(editingId, bookingData);
                alert("Cập nhật booking thành công!");
            }
            setShowModal(false);
            fetchBookings();
        } catch (error) {
            console.error("Failed to save booking:", error);
            alert("Lỗi khi lưu booking!");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBooking(deleteId);
            alert("Xóa booking thành công!");
            setShowDeleteModal(false);
            fetchBookings();
        } catch (error) {
            console.error("Failed to delete booking:", error);
            alert("Lỗi khi xóa booking!");
        }
    };

    const openAddModal = () => {
        setBookingData(initialBookingState());
        setIsAdding(true);
        setShowModal(true);
    };

    const openEditModal = (booking) => {
        setBookingData({
            userId: booking.userId?._id || booking.userId,
            carId: booking.carId?._id || booking.carId,
            car: booking.carId?.category,
            name: booking.userId?.name,
            pickupAddress: booking.pickupAddress,
            dropOffAddress: booking.dropOffAddress,
            pickupDate: new Date(booking.pickupDate).toISOString().split("T")[0], // Chuyển thành YYYY-MM-DD
            dropOffDate: new Date(booking.dropOffDate).toISOString().split("T")[0], // Chuyển thành YYYY-MM-DD
            pickupTime: booking.pickupTime,
            dropOffTime: booking.dropOffTime,
            status: booking.status,
        });
        setEditingId(booking._id);
        setIsAdding(false);
        setShowModal(true);
    };


    const openDeleteModal = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    return (
        <div className="container-fluid mt-4 z-3">
            <h2 className="text-center mb-4">Quản lý Bookings</h2>
            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" onClick={openAddModal}>
                    + Thêm Booking
                </Button>
            </div>
            <div className="table-responsive">
                <Table bordered hover>
                    <thead className="text-center">
                        <tr>
                            <th>STT</th>
                            <th>User</th>
                            <th>Car</th>
                            <th>Pickup Address</th>
                            <th>Drop Off Address</th>
                            <th>Pickup Date</th>
                            <th>Drop Off Date</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(bookings) && bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                                <tr key={booking._id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{booking.userId?.name || "Không xác định"}</td>
                                    <td>{booking.carId?.category || "Không xác định"}</td>
                                    <td>{booking.pickupAddress}</td>
                                    <td>{booking.dropOffAddress}</td>
                                    <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.dropOffDate).toLocaleDateString()}</td>
                                    <td>{booking.status}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => openEditModal(booking)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => openDeleteModal(booking._id)}
                                        >
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modal Thêm / Sửa */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{isAdding ? "Thêm Booking" : "Chỉnh Sửa Booking"}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={bookingData.name}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Car</Form.Label>
                            <Form.Control
                                type="text"
                                value={bookingData.car}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Pickup Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={bookingData.pickupAddress}
                                onChange={(e) => setBookingData({ ...bookingData, pickupAddress: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Drop Off Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={bookingData.dropOffAddress}
                                onChange={(e) => setBookingData({ ...bookingData, dropOffAddress: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Pickup Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={bookingData.pickupDate}
                                onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Drop Off Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={bookingData.dropOffDate}
                                onChange={(e) => setBookingData({ ...bookingData, dropOffDate: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Pickup Time</Form.Label>
                            <Form.Control
                                type="text"
                                value={bookingData.pickupTime}
                                onChange={(e) => setBookingData({ ...bookingData, pickupTime: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Drop Off Time</Form.Label>
                            <Form.Control
                                type="text"
                                value={bookingData.dropOffTime}
                                onChange={(e) => setBookingData({ ...bookingData, dropOffTime: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                value={bookingData.status}
                                onChange={(e) => setBookingData({ ...bookingData, status: e.target.value })}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">completed</option>
                                <option value="cancelled">Cancelled</option>
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
                <Modal.Body>Bạn có chắc chắn muốn xóa booking này không?</Modal.Body>
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

const initialBookingState = () => ({
    userId: "",
    carId: "",
    pickupAddress: "",
    dropOffAddress: "",
    pickupDate: "",
    dropOffDate: "",
    pickupTime: "",
    dropOffTime: "",
    status: "pending",
});

export default ManageBooking;
