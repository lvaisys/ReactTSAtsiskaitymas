import { useContext, useState } from "react";
import { v4 as generateID } from "uuid"
import { Link, useNavigate } from "react-router-dom";
import UsersContext, { UsersContextTypes } from "../../contexts/UsersContext";
import ArticlesContext, { ArticleContextType, ArticleType } from "../../contexts/ArticleContext";
import styled from "styled-components";

const StyledDiv = styled.div`
  > form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    p { margin: 0;}
    >div {
      display: flex;
      > label {
        width: 8%;
      }
      > input {
        width: 70%;
      }

    }
  }
`;
const AddArticle = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const { addNewArticle } = useContext(ArticlesContext) as ArticleContextType;
  const [formAnswer, setFormAnswer] = useState('');

  const [inputValues, setInputValues] = useState({
    image: '',
    description: '',
    title: '',
  });

  const [errorsMessages, setErrorMessages] = useState({
    image: '',
    description: undefined,
    title: undefined,
  });

  const registerErrorChecking: {
    [key: string]: (input: string) => string;
  } = {
    image: (input: string) => {
      return '';
    },
    description: (input: string) => {
      if (input.length < 10) {
        return 'Description should be at least 10 characters long';
      } else {
        return '';
      }
    },
    title: (input: string) => {
      if (input.length < 10) {
        return 'Title should be at least 10 characters long';
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
        errorExist = value === undefined || value !== '';
      })
    if (!errorExist) {
      const newArticle: ArticleType = {
        ...inputValues,
        id: generateID(),
        createdby: loggedInUser!.id,
        createdbyName: loggedInUser!.username,
        createdByImage: loggedInUser!.photo,
        createdAt: (new Date()).toLocaleString()
      };
      setFormAnswer('Article registered successfully.');
      addNewArticle(newArticle);
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } else {
      setFormAnswer('Please fill all fields correctly');
    }
  }

  return (
    <StyledDiv>
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
      <Link to="/">Cancel</Link>
      {
        formAnswer && <p>{formAnswer} </p>
      }
    </StyledDiv>
  );
}

export default AddArticle;