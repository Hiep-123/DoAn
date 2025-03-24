import React, { useState, useEffect, useContext } from "react";
import { getAllCar, addCar, updateCar, deleteCar, getAllBrandCar } from "@/apis/carService";
import { ToastContext } from "@/context/ToastProvider";
import { Modal, Button, Form } from "react-bootstrap";
import './styles.module.scss'
const ManageCar = () => {
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [carData, setCarData] = useState({ img: "", category: "", brandId: "", pricePerDay: "", des: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const { toast } = useContext(ToastContext);
  const fetchBrands = async () => {
    try {
      const response = await getAllBrandCar();
      setBrands(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách dòng xe");
    }
  };
  const fetchCars = async (page = 1) => {
    try {
      const response = await getAllCar(page, itemsPerPage);
      setCars(response.data.cars);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách xe!");
    }
  };

  useEffect(() => {
    fetchCars(currentPage);
    fetchBrands()
  }, [currentPage]);

  const handleFileChange = (e) => {
    setCarData({ ...carData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = carData.img;

    if (carData.img instanceof File) {
      const formData = new FormData();
      formData.append("image", carData.img);

      try {
        const uploadResponse = await fetch("http://localhost:8080/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.imageUrl; // Lấy URL ảnh từ server
      } catch (error) {
        toast.error("Lỗi khi tải ảnh lên!");
        return;
      }
    }

    // Cập nhật dữ liệu xe
    const newCarData = { ...carData, img: imageUrl };

    try {
      if (isAdding) {
        await addCar(newCarData);
        toast.success("Thêm xe thành công!");
      } else {
        await updateCar(editingId, newCarData);
        toast.success("Cập nhật xe thành công!");
      }
      setShowModal(false);
      fetchCars(currentPage);
    } catch (error) {
      toast.error("Lỗi khi lưu xe!");
    }
  };


  const handleDelete = async () => {
    try {
      await deleteCar(deleteId);
      toast.success("Xóa xe thành công!");
      setShowDeleteModal(false);
      fetchCars(currentPage);
    } catch (error) {
      toast.error("Lỗi khi xóa xe!");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center fs-3 mb-3">Quản lý xe</h2>
      <div className="d-flex justify-content-end mt-4 mb-3">
        <button className="btn btn-success fs-4 px-4 py-2" onClick={() => {
          setCarData({ img: "", category: "", brandId: "", pricePerDay: "", des: "" });
          setIsAdding(true);
          setShowModal(true);
        }}>
          + Thêm xe
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered w-100" style={{ minWidth: "1200px" }}>
          <thead>
            <tr className="fs-4 text-center">
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Danh mục</th>
              <th>Thương hiệu</th>
              <th>Giá thuê/ngày</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car._id}>
                <td className="fs-5 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="text-center">
                  <img src={car.img} alt="Car" width="120" height="70" style={{ objectFit: "cover" }} />
                </td>
                <td className="fs-4">{car.category}</td>
                <td className="fs-4">{car.brandId?.nameBrandCar}</td>
                <td className="fs-4">{car.pricePerDay}.00 $</td>
                <td className="fs-5"
                  style={{ width: '20%' }}>{car.des}</td>
                <td className="d-flex justify-content-around">
                  <button className="btn btn-warning fs-4" onClick={() => {
                    setCarData(car);
                    setEditingId(car._id);
                    setIsAdding(false);
                    setShowModal(true);
                  }}>
                    Sửa
                  </button>
                  <button className="btn btn-danger fs-4" onClick={() => {
                    setDeleteId(car._id);
                    setShowDeleteModal(true);
                  }}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-secondary mx-2" disabled={currentPage === 1} onClick={() => fetchCars(currentPage - 1)}>
          Trước
        </button>
        <span className="fs-5">Trang {currentPage} / {totalPages}</span>
        <button className="btn btn-secondary mx-2" disabled={currentPage === totalPages} onClick={() => fetchCars(currentPage + 1)}>
          Sau
        </button>
      </div>

      {/* Modal Thêm / Sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isAdding ? "Thêm Xe" : "Chỉnh Sửa Xe"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh URL</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {carData.img && typeof carData.img === "string" && (
                <img src={carData.img} alt="Car Preview" width="100" height="60" className="mt-2" />
              )}

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control type="text" value={carData.category} onChange={(e) => setCarData({ ...carData, category: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thương hiệu</Form.Label>
              <Form.Select value={carData.brandId} onChange={(e) => setCarData({ ...carData, brandId: e.target.value })}>
                <option value="">Chọn thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.nameBrandCar}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá thuê/ngày</Form.Label>
              <Form.Control type="number" value={carData.pricePerDay} onChange={(e) => setCarData({ ...carData, pricePerDay: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control as="textarea" value={carData.des} onChange={(e) => setCarData({ ...carData, des: e.target.value })} />
            </Form.Group>
            <Button type="submit" variant="success">Lưu</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Xóa */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa xe này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          <Button variant="danger" onClick={handleDelete}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageCar;