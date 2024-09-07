import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./cycle.module.css";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [params, setParams] = useState({ limit: 9, skip: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [params.skip, currentPage, searchQuery]);

  const fetchProducts = async () => {
    const { limit, skip } = params;
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
      filterProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (productsList) => {
    if (!searchQuery) {
      setFilteredProducts(productsList);
      return;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = productsList.filter(product =>
      product.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleAddClick = () => {
    navigate('/products/add'); // Navigate to product form
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setParams((prevParams) => ({
      ...prevParams,
      skip: (pageNumber - 1) * prevParams.limit,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setParams((prevParams) => ({ ...prevParams, skip: 0 }));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalProducts / params.limit);
    const pageRange = 2;
    const startPage = Math.max(currentPage - pageRange, 1);
    const endPage = Math.min(currentPage + pageRange, totalPages);

    return (
      <div className={styles.paginationContainer}>
        <button
          type="button"
          className={styles.pageButton}
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Prev
        </button>
        {currentPage > 1 && (
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
        )}
        {startPage > 1 && <span className={styles.ellipsis}>...</span>}
        {[...Array(endPage - startPage + 1)].map((_, idx) => {
          const pageNumber = startPage + idx;
          return (
            <button
              key={pageNumber}
              type="button"
              className={`${styles.pageButton} ${currentPage === pageNumber ? styles.activePage : ''}`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        {endPage < totalPages && <span className={styles.ellipsis}>...</span>}
        {totalPages > 1 && (
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </button>
        )}
        <button
          type="button"
          className={styles.pageButton}
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>List Products</h1>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

        <button onClick={handleAddClick} className={styles.add}>
          Create New Product
        </button>

      <div>
        {loading ? (
          "loading..."
        ) : (
          <div className={styles.productsContainer}>
            {filteredProducts.map((item) => (
              <div key={item.id} className={styles.productsItem}>
                <img
                  className={styles.productsItemCover}
                  src={item.thumbnail}
                  alt={`product-cover-${item.id}`}
                />
                <span>{item.title}</span>
                <p>{item.price}</p>
                <button className={styles.button}>See Product</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {renderPagination()}
    </div>
  );
};

export default Products;
