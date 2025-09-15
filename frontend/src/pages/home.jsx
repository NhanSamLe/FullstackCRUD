import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  Button,
  Select,
  message,
  Input,
  InputNumber,
  Collapse,
  Pagination,
} from "antd";
import axios from "../util/base";
import * as api from "../util/api";

const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;

const HomePage = () => {

  const [brands, setBrands] = useState([]);
const [cpus, setCpus] = useState([]);
const [rams, setRams] = useState([]);
const [storages, setStorages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCate, setSelectedCate] = useState(null);
  const [brand, setBrand] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [ram, setRam] = useState(null);
  const [storage, setStorage] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // số sản phẩm mỗi trang
  const [total, setTotal] = useState(0);

  const keywordRef = useRef(""); // nhớ keyword hiện tại

  // Lấy danh mục
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/cate");
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy categories:", err);
      message.error("Không thể tải danh mục!");
    }
  };
  useEffect(() => {
  const fetchFilters = async () => {
    try {
      const res = await axios.get("product/filters");
      setBrands(res.data.brands || []);
      setCpus(res.data.cpus || []);
      setRams(res.data.rams || []);
      setStorages(res.data.storages || []);
    } catch (err) {
      message.error("Không thể tải bộ lọc!");
    }
  };
  fetchFilters();
}, []);

  // API search + filter
  const fetchFuzzySearch = async (keyword = "", pageNum = 1) => {
    try {
      setLoading(true);
      const res = await api.fuzzySearch(keyword, pageNum, limit, {
        brand: brand || undefined,
        category: selectedCate || undefined,
        cpu: cpu || undefined,
        ram: ram || undefined,
        storage: storage || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      });
      setProducts(res.items || []);
      setTotal(res.total || 0);
      setPage(res.page || 1);
    } catch (error) {
      console.error("Lỗi khi search sản phẩm:", error);
      message.error("Không thể tìm sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchFuzzySearch("", 1); // load toàn bộ sản phẩm khi mở trang
  }, []);

  // Tự động search lại khi filter thay đổi
  useEffect(() => {
    fetchFuzzySearch(keywordRef.current, 1);
  }, [selectedCate, brand, cpu, ram, storage, minPrice, maxPrice]);

  const handleSearch = (value) => {
    keywordRef.current = value;
    fetchFuzzySearch(value, 1);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Danh sách sản phẩm
      </h1>

      {/* Ô tìm kiếm chính */}
      <Search
        placeholder="Tìm sản phẩm..."
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: 20 }}
      />

      {/* Bộ lọc nâng cao */}
      <Collapse>
        <Panel header="Bộ lọc nâng cao" key="1">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            <Select
              placeholder="Chọn danh mục"
              style={{ width: 200 }}
              onChange={(val) => setSelectedCate(val)}
              value={selectedCate || undefined}
              allowClear
            >
              {categories.map((cate) => (
                <Option key={cate._id} value={cate._id}>
                  {cate.name}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Chọn thương hiệu"
              style={{ width: 200 }}
              onChange={(val) => setBrand(val)}
              value={brand || undefined}
              allowClear
            >
                        {brands.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

            <Select
              placeholder="Chọn CPU"
              style={{ width: 200 }}
              onChange={(val) => setCpu(val)}
              value={cpu || undefined}
              allowClear
            >
              {cpus.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

            <Select
              placeholder="Chọn RAM"
              style={{ width: 200 }}
              onChange={(val) => setRam(val)}
              value={ram || undefined}
              allowClear
            >
              {rams.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

            <Select
              placeholder="Chọn Storage"
              style={{ width: 200 }}
              onChange={(val) => setStorage(val)}
              value={storage || undefined}
              allowClear
            >
              {storages.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

            <InputNumber
              placeholder="Giá từ"
              style={{ width: 120 }}
              min={0}
              onChange={(val) => setMinPrice(val || null)}
              value={minPrice || undefined}
            />
            <InputNumber
              placeholder="Đến"
              style={{ width: 120 }}
              min={0}
              onChange={(val) => setMaxPrice(val || null)}
              value={maxPrice || undefined}
            />
          </div>
        </Panel>
      </Collapse>

      {/* Loading & danh sách sản phẩm */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
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
                  <h3>{product.name}</h3>
                  <p><strong>Thương hiệu:</strong> {product.brand}</p>
                  <p><strong>CPU:</strong> {product.cpu}</p>
                  <p><strong>RAM:</strong> {product.ram}</p>
                  <p><strong>Lưu trữ:</strong> {product.storage}</p>
                  <p><strong>GPU:</strong> {product.gpu}</p>
                  <p><strong>Màn hình:</strong> {product.screen}</p>
                  <p><strong>Số lượng còn:</strong> {product.quantity}</p>
                  <p><strong>Danh mục:</strong> {product.category?.name}</p>
                  <p><strong>Mô tả:</strong> {product.description}</p>
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    ${product.price.toLocaleString()}
                  </p>
                  <Button type="primary" block style={{ marginTop: "10px" }}>
                    Thêm vào giỏ
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Pagination
              current={page}
              pageSize={limit}
              total={total}
              onChange={(newPage) => {
                setPage(newPage);
                fetchFuzzySearch(keywordRef.current, newPage);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
