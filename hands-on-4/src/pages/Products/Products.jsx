import { Component } from "react";
// import css module version
import styles from "./cycle.module.css"; 
 
// class Products extends Component: Membuat kelas Products yang merupakan komponen React, dan mewarisi properti serta metode dari Component.
class Products extends Component {
  // constructor(props): Fungsi ini adalah bagian dari React yang digunakan untuk menginisialisasi komponen. Di dalamnya, kita memanggil super(props) untuk mengakses properti dan metode dari Component.
  constructor(props) {
    super(props);

    // this.state: Mengatur state awal komponen yang mencakup berbagai informasi seperti daftar produk (products), produk yang difilter (filteredProducts), jumlah total produk (totalProducts), parameter untuk mengatur pagination (params), halaman saat ini (currentPage), dan kueri pencarian (searchQuery).
    // loading: Menyimpan status loading saat data sedang diambil.
    // products: Menyimpan daftar produk yang diambil dari API.
    // params: Menyimpan parameter untuk pagination (limit dan skip).
    this.state = {
      loading: false,
      products: [], 
      filteredProducts: [],
      totalProducts: 0,
      params: {
        limit: 9,
        skip: 0,
      },
      currentPage: 1,
      searchQuery: "",
    };
  }

  // componentDidMount adalah lifecycle method yang dimiliki oleh komponen React berbasis kelas. Metode ini secara otomatis dipanggil setelah komponen pertama kali dimount ke DOM (Document Object Model). Dalam konteks aplikasi web, "mounting" berarti komponen tersebut telah dirender ke layar untuk pertama kalinya.
  // Tujuan: Pada componentDidMount, biasanya kita melakukan tugas yang membutuhkan akses ke DOM, seperti mengambil data dari API eksternal, menginisialisasi library, atau mengatur event listener.
  //Fungsi componentDidMount diberi kata kunci async, yang menandakan bahwa ini adalah fungsi asinkron.
  //Kata kunci async memungkinkan penggunaan await di dalam fungsi tersebut. Ini memungkinkan kita untuk "menunggu" operasi asinkron, seperti panggilan ke API, untuk menyelesaikan sebelum melanjutkan eksekusi kode.
  //Dalam kode ini, async digunakan karena this.fetchProducts() adalah operasi asinkron yang mengambil data produk dari API. Dengan menggunakan async, kita dapat menulis kode yang lebih mudah dibaca dan di-maintain karena alurnya terlihat seolah-olah sinkron, meskipun di belakang layar eksekusi tidak terblokir.
  async componentDidMount() {
    this.fetchProducts();
  }

  // Dipanggil setiap kali state atau props diperbarui. Jika parameter pagination atau query pencarian berubah, fetchProducts dipanggil ulang untuk mengambil data baru.
 //componentDidUpdate juga merupakan lifecycle method dalam React yang dipanggil setelah komponen diperbarui (update), yaitu ketika state atau props-nya berubah. Metode ini memberi kita kesempatan untuk mengeksekusi kode tertentu setelah pembaruan terjadi, seperti memeriksa perubahan state atau props dan bereaksi terhadapnya.
//  Tujuan: componentDidUpdate digunakan di sini untuk memeriksa apakah ada perubahan penting di state yang memerlukan pengambilan data ulang dari API. Jika nilai skip, currentPage, atau searchQuery berubah, fungsi fetchProducts() dipanggil kembali untuk mendapatkan data yang sesuai dengan kondisi baru.
// prevProps dan prevState adalah parameter yang secara otomatis diteruskan ke componentDidUpdate.
// prevProps merujuk pada props sebelum update, dan prevState merujuk pada state sebelum update.
// Dengan membandingkan prevState dan state saat ini (this.state), kita bisa mengetahui perubahan apa yang telah terjadi dan bertindak berdasarkan perubahan tersebut.
async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.params.skip !== prevState.params.skip ||
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchProducts();
    }
  }
  // params.skip digunakan untuk paginasi (membagi data ke dalam beberapa halaman). Misalnya, jika ada 100 produk dan limit ditetapkan menjadi 10, maka untuk menampilkan halaman pertama, skip akan bernilai 0 (tidak melewati produk apapun), untuk halaman kedua skip akan bernilai 10 (melewati 10 produk pertama), dan seterusnya.
  // currentPage adalah nilai dari halaman saat ini yang sedang ditampilkan kepada pengguna.
  // searchQuery adalah string yang menyimpan kata kunci pencarian yang diinput oleh pengguna untuk memfilter produk.

  // fetchProducts: Fungsi ini mengambil data produk dari API https://dummyjson.com/products berdasarkan limit dan skip yang ada di state. 
  // Mengambil data produk dari API menggunakan fetch. Setelah data didapatkan, state diperbarui dengan data produk dan jumlah total produk.
  // Setelah data diatur, fungsi filterProducts dipanggil untuk memfilter produk sesuai dengan query pencarian.
  async fetchProducts() {
    const { limit, skip } = this.state.params;
    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      this.setState({
        products: data.products,
        totalProducts: data.total,
      }, this.filterProducts); // Call filterProducts after setting the state
    } catch (error) {
      console.log("error > ", error);
    } finally {
      this.setState({ loading: false });
    }
  }

  //filterProducts: Fungsi ini memfilter produk berdasarkan kueri pencarian (searchQuery). Jika tidak ada kueri pencarian, semua produk ditampilkan; jika ada, hanya produk yang sesuai dengan kueri yang ditampilkan.
  filterProducts = () => {
    const { products, searchQuery } = this.state;
    if (!searchQuery) {
      this.setState({ filteredProducts: products });
      return;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(lowerCaseQuery)
    );
    this.setState({ filteredProducts });
  };

  // handlePageClick: Fungsi ini mengubah halaman saat ini (currentPage) dan mengatur ulang skip berdasarkan halaman yang diklik, sehingga produk yang ditampilkan akan sesuai dengan halaman yang baru.
  handlePageClick = (pageNumber) => {
    const { params } = this.state;
    this.setState({
      currentPage: pageNumber,
      params: {
        ...params,
        skip: (pageNumber - 1) * params.limit,
      },
    });
  };

  // Mengelola perubahan pada input pencarian pengguna. Setiap kali pengguna mengetikkan query baru, state diperbarui dan halaman di-reset ke 1. Produk difilter berdasarkan query baru.
  handleSearchChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
      currentPage: 1, // Reset halaman aktif saat pencarian
      params: {
        ...this.state.params,
        skip: 0, // Mulai dari halaman pertama saat pencarian baru
      },
    }, this.filterProducts); // Call filterProducts after updating the state
  };

  // renderPagination: Fungsi ini menghasilkan elemen navigasi untuk pagination, memungkinkan pengguna untuk berpindah halaman. Fungsi ini menampilkan nomor halaman, tombol "Prev" (sebelum) dan "Next" (berikutnya), serta menangani logika untuk rentang halaman yang ditampilkan.
  renderPagination() {
    const { totalProducts, params, currentPage } = this.state;
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
          onClick={() => this.handlePageClick(currentPage - 1)}
        >
          Prev
        </button>
        {currentPage > 1 && (
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => this.handlePageClick(1)}
          >
            1
          </button>
        )}
        {startPage > 1 && (
          <span className={styles.ellipsis}>...</span>
        )}
        {[...Array(endPage - startPage + 1)].map((_, idx) => {
          const pageNumber = startPage + idx;
          return (
            <button
              key={pageNumber}
              type="button"
              className={`${styles.pageButton} ${currentPage === pageNumber ? styles.activePage : ''}`}
              onClick={() => this.handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        {endPage < totalPages && (
          <span className={styles.ellipsis}>...</span>
        )}
        {totalPages > 1 && (
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => this.handlePageClick(totalPages)}
          >
            {totalPages}
          </button>
        )}
        <button
          type="button"
          className={styles.pageButton}
          disabled={currentPage === totalPages}
          onClick={() => this.handlePageClick(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }

  // render: Fungsi ini menentukan apa yang akan ditampilkan oleh komponen Products. Di sini, komponen menampilkan judul, input pencarian, daftar produk (berdasarkan pencarian dan pagination), dan pagination itu sendiri.
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}> List Products</h1>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search products..."
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
        />
        <div>
          {this.state.loading ? (
            "loading..."
          ) : (
            <div className={styles.productsContainer}>
              {this.state.filteredProducts.map((item) => (
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
        {this.renderPagination()} {/* Render pagination */}
      </div>
    );
  }
}

export default Products;
