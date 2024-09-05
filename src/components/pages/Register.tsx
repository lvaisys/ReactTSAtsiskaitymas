import { useContext, useState } from "react";
import { v4 as generateID } from "uuid"
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from "react-router-dom";
import UsersContext, { UsersContextTypes, UserType } from "../../contexts/UsersContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { addNewUser, logIn } = useContext(UsersContext) as UsersContextTypes;
  const [formAnswer, setFormAnswer] = useState('');

  const [inputValues, setInputValues] = useState({
    email: '',
    username: '',
    photo: '',
    dob: '',
    password: '',
    passwordRepeat: '',
  });

  const [errorsMessages, setErrorMessages] = useState({
    email: '',
    username: '',
    photo: '',
    dob: '',
    password: '',
    passwordRepeat: '',
  });

  const registerErrorChecking: {
    [key: string]: (input: string) => string;
  } = {
    username: (input: string) => {
      if (input.length < 3) {
        return 'Must be longet than 3';
      } else if (input.length >= 20) {
        return 'Must be shorter than 20';
      } else if (!input) {
        return 'Field must be filled';
      } else {
        return '';
      }
    },
    email: (input: string) => {
      if (!input) {
        return 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          return 'Invalid email format';
        } else {
          return '';
        }
      }
    },
    dob: (input: string) => {
      if (!input) {
        return 'Date of birth is required';

      } else {
        return '';
      }
    },
    photo: (input: string) => {
      return '';
    },
    password: (input: string) => {
      if (input.length < 3) {
        return 'Password must be at least 3 characters long';
      } else if (!/[A-Z]/.test(input)) {
        return 'Password must contain at least one uppercase letter';
      } else {
        return '';
      }
    },
    passwordRepeat: (input: string) => {
      if (input !== inputValues.password || input.length === 0) {
        return 'Passwords do not match';
      } else {
        return '';
      }
    }
  }

  const blurHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessages({
      ...errorsMessages,
      [event.target.name]: registerErrorChecking[event.target.name](event.target.value)
    });
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value
    })
  }
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errorExist = false;
    Object.entries(errorsMessages)
      .forEach(([, value]) => {
        errorExist = value !== '';
      })

    if (inputValues.password === inputValues.passwordRepeat && !errorExist) {
      const newUser: UserType = {
      id: generateID(),
      username: inputValues.username,
      photo: inputValues.photo || "hahahha",
      email: inputValues.email,
      DOB: inputValues.dob,
      password: bcrypt.hashSync(inputValues.password, 10),
      savedArticles: [] } ;
      addNewUser(newUser);
      logIn(newUser.username, newUser.password);
      navigate('/');
    } else {
      setFormAnswer('Please fill all fields correctly');
    }
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email" id="email"
            placeholder="Enter your email..."
            value={inputValues.email}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.email && <p>{errorsMessages.email}</p>
          }
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username" id="username"
            placeholder="Enter your user name..."
            value={inputValues.username}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.username && <p>{errorsMessages.username}</p>
          }
        </div>
        <div>
          <label htmlFor="dob">Date of birth:</label>
          <input
            type="date"
            name="dob" id="dob"
            placeholder="Enter your date of birth..."
            value={inputValues.dob}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.dob && <p>{errorsMessages.dob}</p>
          }
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            type="url"
            name="photo" id="photo"
            placeholder="Enter a link to Your photo..."
            value={inputValues.photo}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.photo && <p>{errorsMessages.photo}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password" id="password"
            placeholder="Enter your password..."
            value={inputValues.password}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.password && <p>{errorsMessages.password}</p>
          }
        </div>
        <div>
          <label htmlFor="passwordRepeat">Repeat Password:</label>
          <input
            type="password"
            name="passwordRepeat" id="passwordRepeat"
            placeholder="Repeat your password..."
            value={inputValues.passwordRepeat}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.passwordRepeat && <p>{errorsMessages.passwordRepeat}</p>
          }
        </div>
        <input type="submit" value="Register" />
      </form>
      <p>Go <Link to="/login">Login</Link></p>
      {
        formAnswer && <p>Error: {formAnswer} </p>
      }
    </>
  );
}

export default RegisterForm;