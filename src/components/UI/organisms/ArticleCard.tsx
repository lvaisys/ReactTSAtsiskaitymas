import styled from "styled-components";

import ArticlesContext, { ArticleContextType, ArticleType } from "../../../contexts/ArticleContext";
import { useContext, useState } from "react";
import UsersContext, { UsersContextTypes } from "../../../contexts/UsersContext";

type Props = {
  data: ArticleType
}
const StyledDiv = styled.div`
  width: 350px;
  border: 1px solid black;
  padding: 5px;

  > h3{
    text-align: center;
  }
  > img{
    width: 100%;
  }
  >div {
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      border-radius: 30%;
      width: 30px;
    } 
  }
`;

const ArticleCard = ({ data }: Props) => {

  const { loggedInUser, toggleSaving } = useContext(UsersContext) as UsersContextTypes;
  const { deleteArticle } = useContext(ArticlesContext) as ArticleContextType;
  const [savingState, setSavingState] = useState(loggedInUser?.savedArticles.some(el=> el === data.id) ? "Unsave": "Save");

  return (
    <StyledDiv>

      <h3>{data.title}</h3>
      <img
        src={data.image}
        alt={data.title}
      />
      <p>{data.description}</p>
      <span>{data.createdAt}</span>
      <div>
        <img src={data.createdByImage} alt={data.createdbyName} />
        <span>{data.createdbyName}</span>

        {data.createdby === loggedInUser?.id ?
          <button onClick={() => deleteArticle(data.id)}>Delete</button> : <></>}
        {loggedInUser !== undefined
          ?
          <button onClick={() => {toggleSaving(loggedInUser.id, loggedInUser.savedArticles, data.id);
            setSavingState(loggedInUser?.savedArticles.some(el=> el === data.id) ? "Unsave": "Save");
          }}>
            {savingState}</button>
          :
          <></>}
      </div>
    </StyledDiv>
  );
}

export default ArticleCard;