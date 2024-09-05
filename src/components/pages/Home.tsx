import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArticlesContext, { ArticleContextType } from "../../contexts/ArticleContext";
import UsersContext, { UsersContextTypes } from "../../contexts/UsersContext";
import ArticleCard from "../UI/organisms/ArticleCard";


const StyledArticlesContainer = styled.section`
  
  > div{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around;
  }
`;

const Home = () => {

  const { articles } = useContext(ArticlesContext) as ArticleContextType;
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

  return (
    <StyledArticlesContainer>
      <h2>Our Articles</h2>
      {loggedInUser ? <Link to="addArticle"><button>Create New</button></Link> : <></> }
      
      <div>
        {
          articles.map(article => 
            <ArticleCard
              key={article.id}
              data={article}
            />
          )
        }
      </div>
    </StyledArticlesContainer>
  );
}
 
export default Home;