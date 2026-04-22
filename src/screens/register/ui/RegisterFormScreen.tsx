import { useState } from "react";
import { useAppDispatch } from "../../../app/store/hooks";
import { registerRequest } from "../../../features/register/model/Slice";
import type { RegisterPayload } from "../../../features/register/model/Types";

export function RegisterFormScreen() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    birthday: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      formData.lastname.trim().length >= 2 &&
      formData.username.trim() !== "" &&
      formData.birthday !== "" &&
      formData.email.trim() !== "" &&
      formData.password.length >= 8
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    dispatch(registerRequest(formData as RegisterPayload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          placeholder="Name" 
        />
        <input 
          type="text" 
          name="lastname" 
          value={formData.lastname} 
          onChange={handleInputChange} 
          placeholder="Surname" 
        />
      </div>
      <div className="input-group">
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleInputChange} 
          placeholder="Username" 
        />
      </div>
      <div className="birthday-section">
        <input 
          type="date" 
          name="birthday" 
          value={formData.birthday} 
          onChange={handleInputChange} 
          placeholder="Дата рождения" 
          className="birthday-input" 
        />
      </div>
      <div className="phone-gender-row">
        <input 
          type="tel" 
          name="phone" 
          value={formData.phone} 
          onChange={handleInputChange} 
          placeholder="Номер телефона" 
          className="phone-input" 
        />
      </div>
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleInputChange} 
        placeholder="Email address" 
      />
      <div className="password-wrapper">
        <input 
          type={showPassword ? "text" : "password"} 
          name="password"
          value={formData.password} 
          onChange={handleInputChange}
          placeholder="Password (min 8 characters)" 
          className="password-input" 
        />
        <button 
          type="button" 
          className="password-toggle" 
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Скрыть" : "Показать"}
        </button>
      </div>
      <button 
        type="submit" 
        className="signup-btn"
        disabled={!isFormValid()}
      >
        Продолжить
      </button>
    </form>
  );
}