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

  const filteredArticlesForUser = articles?.filter(article => loggedInUser?.savedArticles.some(a => a === article.id));

  return (
    <StyledArticlesContainer>
      <h2>Saved Articles</h2>
      <div>
        {
          filteredArticlesForUser.length > 0 ?
          filteredArticlesForUser!.map(article =>
            <ArticleCard
              key={article.id}
              data={article}
            />
          )
          :
          <p>There are no articles saved.</p>
        }
      </div>
    </StyledArticlesContainer>
  );
}

export default SavedArticles;