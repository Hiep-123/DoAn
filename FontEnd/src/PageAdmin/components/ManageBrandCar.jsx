import React, { useContext, useEffect, useState } from "react";
import { deleteBrandCarId, getAllBrandCar, updateBrandCar, addBrandCar } from "../../apis/carService";
import { ToastContext } from "@/context/ToastProvider";

const ManageBrandCar = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // Phân biệt giữa "Thêm" và "Sửa"
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await getAllBrandCar();
      setBrands(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách dòng xe");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { nameBrandCar: name };

      if (isAdding) {
        await addBrandCar(data); // Gọi API thêm mới
        toast.success("Thêm dòng xe thành công!");
      } else if (editingId) {
        await updateBrandCar(editingId, data);
        toast.success("Cập nhật dòng xe thành công!");
      } else {
        toast.error("Vui lòng nhập thông tin!");
      }

      setShowModal(false);
      setEditingId(null);
      setName("");
      fetchBrands();
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const handleEdit = (brand) => {
    setName(brand.nameBrandCar);
    setEditingId(brand._id);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa không?")) {
      try {
        await deleteBrandCarId(id);
        toast.success("Xóa dòng xe thành công");
        fetchBrands();
      } catch (error) {
        toast.error("Lỗi khi xóa!");
      }
    }
  };

  const handleAddNew = () => {
    setName("");
    setEditingId(null);
    setIsAdding(true);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fs-3 mb-3">Quản lý dòng xe</h2>
      <div className="d-flex justify-content-end mt-4 mb-5">
        <button className="btn btn-success fs-4 px-4 py-2" onClick={handleAddNew}>
          + Thêm dòng xe
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="fs-4 text-center">
            <th>STT</th>
            <th>Tên dòng xe</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={brand._id}>
              <td className="fs-5 text-center">{index + 1}</td>
              <td className="fs-4">{brand.nameBrandCar}</td>
              <td className="d-flex justify-content-around p-3">
                <button className="btn btn-warning me-2 fs-4 w-25" onClick={() => handleEdit(brand)}>
                  Sửa
                </button>
                <button className="btn btn-danger fs-4 ms-3 w-25" onClick={() => handleDelete(brand._id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* MODAL EDIT/ADD */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isAdding ? "Thêm dòng xe" : "Chỉnh sửa dòng xe"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control fs-5"
                  placeholder="Tên dòng xe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Đóng
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  {isAdding ? "Thêm mới" : "Lưu"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBrandCar;
