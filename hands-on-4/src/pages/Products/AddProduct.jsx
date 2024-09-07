import React, { useState } from "react";
import styles from "./cycle.module.css";

function AddProduct() {
  const [products, setProducts] = useState([]); // State untuk menyimpan array produk
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    sku: "",
    weight: "",
  });

  // Menghandle perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Menghandle submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat submit form

    // Tambahkan data produk baru ke array state
    setProducts((prevProducts) => [
      ...prevProducts,
      formData, // Tambahkan produk baru
    ]);

    // Log state products setelah update
    console.log([...products, formData]); // Log array products termasuk produk baru
    // [...products]: Spread operator ini mengambil semua elemen dalam array products yang lama.
    // formData: Ini adalah objek produk baru yang baru saja Anda inputkan.
//[...products, formData]: Membuat array baru yang berisi semua produk lama dan produk baru yang baru saja diinputkan.

    // Reset form input setelah submit
    setFormData({
      title: "",
      description: "",
      price: "",
      brand: "",
      sku: "",
      weight: "",
    });
  };

  return (
    <>
      <div className={styles.formC}>
        <div className={styles.form}>
          <h1 className={styles.judulForm}><b>Add Product</b></h1>
          <form className={styles.formulir} onSubmit={handleSubmit}>
            <div>
              <label className={styles.isi}>
                Title of Product:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="write the title of your product"
                />
              </label>
            </div>

            <div>
              <label className={styles.isi}>
                Description of Product:
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="write the description of your product"
                />
              </label>
            </div>

            <div>
              <label className={styles.isi}>
                Price:
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  className={styles.input}
                  placeholder="10000"
                />
              </label>
            </div>

            <div>
              <label className={styles.isi}>
                Brand:
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="write the brand of your product"
                />
              </label>
            </div>

            <div>
              <label className={styles.isi}>
                Sku:
                <input
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="write the sku of your product"
                />
              </label>
            </div>

            <div>
              <label className={styles.isi}>
                Weight of Product:
                <input
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  type="number"
                  className={styles.input}
                  placeholder="write the weight of your product"
                />
              </label>
            </div>

            <span className={styles.buttonCont}>
              <button className={styles.buttonForm} type="submit">
                Add 
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
