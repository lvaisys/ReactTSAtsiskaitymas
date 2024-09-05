import { useContext } from "react";
import styled from "styled-components";
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

const SavedArticles = () => {

  const { articles } = useContext(ArticlesContext) as ArticleContextType;
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

  return (
    <StyledArticlesContainer>
      <h2>Saved Articles</h2>
      <div>
        {
          articles.filter(article => loggedInUser?.savedArticles.some(a=> a === article.id)).map(article => 
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
 
export default SavedArticles;