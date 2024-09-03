import { createContext, useContext, useState } from "react";

const BankReactContext = createContext({
  uang: 0,
});

const BankReactProvider = ({ children }) => {
  const [uang, setUang] = useState(5000);

  const ambilUang = (jumlahUang) => {
    setUang(uang - jumlahUang);
  };

  return (
    <BankReactContext.Provider
      value={{
        uang,
        ambilUang,
      }}
    >
      {children}
    </BankReactContext.Provider>
  );
};

const Nasabah = () => {
  const { uang, ambilUang } = useContext(BankReactContext);
  return (
    <div>
      <h1>Saldo ATM</h1>
      <p>{uang}</p>
      <button type="button" onClick={() => ambilUang(100)}>
        Ambil Rp. 100
      </button>
    </div>
  );
};

const Atm = () => {
  return (
    <BankReactProvider>
      <Nasabah />
    </BankReactProvider>
  );
};

export default Atm;
