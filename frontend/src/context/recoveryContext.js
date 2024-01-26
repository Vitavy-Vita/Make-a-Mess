import { createContext, useContext, useState } from "react";

export const RecoveryContext = createContext();

export const RecoveryProvider = ({ children }) => {
  const [otp, setOtp] = useState();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordConfirm:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <RecoveryContext.Provider
      value={{  otp, setOtp, inputs, setInputs, handleChange, }}
    >
      {children}
    </RecoveryContext.Provider>
  );
};
export const useRecovery = () => useContext(RecoveryContext);

export default RecoveryProvider;
