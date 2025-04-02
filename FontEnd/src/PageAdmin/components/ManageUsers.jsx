import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContext } from "@/context/ToastProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers, updateInfoUser, registerAuth, deleteUser } from "@/apis/userService";
function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    phone: "",
    userName: "",
    password: "",
    name: "",
    email: "",
    role: "user",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { toast } = useContext(ToastContext);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(); // Gọi API lấy danh sách người dùng
      setUsers(response.data); // Cập nhật danh sách người dùng
    } catch (error) {
      toast.error("Lỗi khi tải danh sách người dùng!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isAdding) {
        console.log(userData)
        await registerAuth(userData); // Gọi API thêm người dùng
        toast.success("Thêm người dùng thành công!");
      } else {
        await updateInfoUser(editingId, userData); // Gọi API cập nhật người dùng
        toast.success("Cập nhật người dùng thành công!");
      }
      setShowModal(false);
      fetchUsers(); // Tải lại danh sách người dùng
    } catch (error) {
      toast.error("Lỗi khi lưu người dùng!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(deleteId); // Gọi API xóa người dùng
      toast.success("Xóa người dùng thành công!");
      setShowDeleteModal(false);
      fetchUsers(); // Tải lại danh sách người dùng
    } catch (error) {
      toast.error("Lỗi khi xóa người dùng!");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center fs-3 mb-3">Quản lý Người Dùng</h2>
      <div className="d-flex justify-content-end mt-4 mb-3">
        <button
          className="btn btn-success fs-4 px-4 py-2"
          onClick={() => {
            setUserData({ name: "", email: "", role: "user" });
            setIsAdding(true);
            setShowModal(true);
          }}
        >
          + Thêm Người Dùng
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered w-100">
          <thead>
            <tr className="fs-4 text-center">
              <th>STT</th>
              <th>Tên</th>
              <th>User name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="fs-5 text-center">{index + 1}</td>
                <td className="fs-5">{user.name}</td>
                <td className="fs-5">{user.userName}</td>
                <td className="fs-5">{user.email}</td>
                <td className="fs-5">{user.phone}</td>

                <td className="fs-5">{user.role}</td>
                <td className="d-flex justify-content-around">
                  <button
                    className="btn btn-warning fs-5"
                    onClick={() => {
                      setUserData(user);
                      setEditingId(user._id);
                      setIsAdding(false);
                      setShowModal(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger fs-5"
                    onClick={() => {
                      setDeleteId(user._id);
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
          <Modal.Title>{isAdding ? "Thêm Người Dùng" : "Chỉnh Sửa Người Dùng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                value={userData.userName}
                onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vai trò</Form.Label>
              <Form.Select
                value={userData.role}
                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
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
        <Modal.Body>Bạn có chắc chắn muốn xóa người dùng này không?</Modal.Body>
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
}

export default ManageUsers;