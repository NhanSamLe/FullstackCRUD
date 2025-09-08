import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Button, Select, message } from "antd";
import axios from "../util/base"; // axios instance

const { Meta } = Card;
const { Option } = Select;

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCate, setSelectedCate] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Gọi API lấy danh mục
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/cate"); // giả sử route category list: /v1/api/cate
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy categories:", err);
      message.error("Không thể tải danh mục!");
    }
  };

  // Gọi API lấy sản phẩm theo danh mục
  const fetchProductsByCategory = async (categoryId) => {
    if (!categoryId) return;
    try {
      setLoading(true);
      const res = await axios.get(`/product/category/${categoryId}`);
      setProducts(res.data.items || []);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      message.error("Không thể tải sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCate(value);
    fetchProductsByCategory(value);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Sản phẩm theo danh mục
      </h1>

      {/* Select danh mục */}
      <Select
        placeholder="Chọn danh mục"
        style={{ width: 250, marginBottom: 20 }}
        onChange={handleCategoryChange}
        value={selectedCate}
      >
        {categories.map((cate) => (
          <Option key={cate._id} value={cate._id}>
            {cate.name}
          </Option>
        ))}
      </Select>

      {/* Loading */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                }
              >
                <Meta
                  title={product.name}
                  description={
                    <>
                      <p>{product.brand}</p>
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        ${product.price.toLocaleString()}
                      </p>
                    </>
                  }
                />
                <Button type="primary" block style={{ marginTop: "10px" }}>
                  Thêm vào giỏ
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;
