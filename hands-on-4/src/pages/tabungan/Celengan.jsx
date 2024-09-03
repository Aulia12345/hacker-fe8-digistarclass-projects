import { useState } from "react";

const Celengan = () => {
  const [uang, setUang] = useState(5000);

  const ambilUang = (jumlahUang) => {
    setUang(uang - jumlahUang);
  };

  return (
    <div>
      <h1>Saldo Celengan</h1>
      <p>{uang}</p>
      <button type="button" onClick={() => ambilUang(100)}>
        Ambil Rp. 100
      </button>
    </div>
  );
};

export default Celengan;
