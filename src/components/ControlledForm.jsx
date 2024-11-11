import { useState } from "react";

const ControlledForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({})

  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [isUserAgree, setIsUserAgree] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      email: userEmail,
      password: userPassword,
      confirmPassword: userConfirmPassword,
      isAgree: isUserAgree
    }

    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'The field is required'
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = 'Alphabets and numbers only';
    }

    if (!formData.email) {
      newErrors.email = 'The field is required'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'The field is required';
    } else if (formData.password.trim().length < 8)
      newErrors.password = 'Password must contain at least 8 symbols';

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'The field is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    setErrors(newErrors);

    console.log(formData);
  }

  return (
    <div className="form-wrap">
      <h1>Uncontrolled Components</h1>
      <form action="#">
        <div className="username input">
          <div className="input-wrap">
            <label htmlFor="username">Username*</label>
            <input type="text" id="username" style={errors.username && { borderBottom: '1px solid #ff5620' }} placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
        </div>

        <div className="email input">
          <div className="input-wrap">
            <label htmlFor="userEmail">Email*</label>
            <input type="email" id="userEmail" style={errors.email && { borderBottom: '1px solid #ff5620' }} placeholder="Enter your email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
        </div>

        <div className="password input">
          <label htmlFor="userPassword">Password*</label>
          <div className="input-wrap">
            <input type={isPasswordVisible ? "text" : "password"} id="userPassword" style={errors.password && { borderBottom: '1px solid #ff5620' }}
              placeholder="Enter your password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
            {!isPasswordVisible && <img src="/eye-closed.svg" alt="eye" onClick={() => setIsPasswordVisible(true)} />}
            {isPasswordVisible && <img src="/eye-open.svg" alt="eye" onClick={() => setIsPasswordVisible(false)} />}
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
        </div>

        <div className="confirm-password input">
          <label htmlFor="userConfirmPassword">Confirm Password*</label>
          <div className="input-wrap">
            <input type={isConfirmPasswordVisible ? "text" : "password"} id="userPassword" style={errors.confirmPassword && { borderBottom: '1px solid #ff5620' }}
              placeholder="Enter your password" value={userConfirmPassword} onChange={e => setUserConfirmPassword(e.target.value)} /  >
            {!isConfirmPasswordVisible && <img src="/eye-closed.svg" alt="eye" onClick={() => setIsConfirmPasswordVisible(true)} />}
            {isConfirmPasswordVisible && <img src="/eye-open.svg" alt="eye" onClick={() => setIsConfirmPasswordVisible(false)} />}
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>
        </div>

        <div className="terms">
          <input type="checkbox" id="userAgree" value={isUserAgree} onChange={e => setIsUserAgree(e.target.checked)}/>
          <label htmlFor="userArgee">I agree to the terms and conditions.</label>
        </div>

        <button onClick={handleSubmit}>Register</button>

        <div className="req-field">* Required field</div>
      </form>
    </div>
  )
}

export default ControlledForm;