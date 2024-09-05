import { useContext, useState } from "react";
import { v4 as generateID } from "uuid"
import { Link, useNavigate } from "react-router-dom";
import UsersContext, { UsersContextTypes } from "../../contexts/UsersContext";
import ArticlesContext, { ArticleContextType, ArticleType } from "../../contexts/ArticleContext";

const AddArticle = () => {
  const navigate = useNavigate();
  const { loggedInUser} = useContext(UsersContext) as UsersContextTypes;
  const { addNewArticle,  } = useContext(ArticlesContext) as ArticleContextType;
  const [formAnswer, setFormAnswer] = useState('');

  const [inputValues, setInputValues] = useState({
    image: '',
    description: '',
    title: '',
  });

  const [errorsMessages, setErrorMessages] = useState({
    image: '',
    description: '',
    title: '',
  });

  const registerErrorChecking: {
    [key: string]: (input: string) => string;
  } = {
    image: (input: string) => {
      if (input.length < 3) {
        return 'Must be longet than 3';
      } else if (input.length >= 10) {
        return 'Must be shorter than 10';
      } else if (!input) {
        return 'Field must be filled';
      } else {
        return '';
      }
    },
    description: (input: string) => {
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
    title: (input: string) => {
      if (input.length < 3) {
        return 'Password must be at least 3 characters long';
      } else if (!/[A-Z]/.test(input)) {
        return 'Password must contain at least one uppercase letter';
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

    if (!errorExist) {
      const newArticle: ArticleType = {...inputValues, id: generateID(), createdby: loggedInUser!.id, createdbyName: loggedInUser!.username, createdByImage: loggedInUser!.photo, createdAt: (new Date()).toLocaleDateString() };
      addNewArticle(newArticle);
      navigate('/');
    } else {
      setFormAnswer('Please fill all fields correctly');
    }
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title" id="title"
            placeholder="Enter title..."
            value={inputValues.title}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.title && <p>{errorsMessages.title}</p>
          }
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description" id="description"
            placeholder="Enter description..."
            value={inputValues.description}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.description && <p>{errorsMessages.description}</p>
          }
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="url"
            name="image" id="image"
            placeholder="Enter a link to image..."
            value={inputValues.image}
            onChange={handleInputChange}
            onBlur={blurHandle}
          />
          {
            errorsMessages.image && <p>{errorsMessages.image}</p>
          }
        </div>
        <input type="submit" value="Add Article" />
      </form>
      <p>Go <Link to="/">Cancel</Link></p>
      {
        formAnswer && <p>Error: {formAnswer} </p>
      }
    </>
  );
}

export default AddArticle;