import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes } from "../../contexts/UsersContext";

const Login = () => {

  const navigate = useNavigate();

  const { logIn } = useContext(UsersContext) as UsersContextTypes;
  const [formAnswer, setFormAnswer] = useState('');
  const [inputValues, setInputValues] = useState({
    username: '',
    password: ''
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event);
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value
    });
  }
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (logIn(inputValues.username, inputValues.password)) {

      setFormAnswer('Logged in successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    else {
      
      setFormAnswer('Wrong username or password');
    }
  }

return (
  <section>
    <h2>Login</h2>
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username" id="username"
          placeholder="Enter your user name..."
          value={inputValues.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password" id="password"
          placeholder="Enter your password..."
          value={inputValues.password}
          onChange={handleInputChange}
        />
      </div>
      <input type="submit" value="Login" />
    </form>
    {
        formAnswer && <p>{formAnswer}</p>
      }
    <p>Go <Link to="/register">Register</Link></p>
  </section>
);
}

export default Login;