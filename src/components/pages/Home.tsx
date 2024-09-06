import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArticlesContext, { ArticleContextType } from "../../contexts/ArticleContext";
import UsersContext, { UsersContextTypes } from "../../contexts/UsersContext";
import ArticleCard from "../UI/organisms/ArticleCard";

const StyledArticlesContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around  }
  > section{
    > div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around  }
  }
  >img {
    margin: 0 auto;
  }
`;

const Home = () => {
  const { articles, articlesLoaded } = useContext(ArticlesContext) as ArticleContextType;
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

  return (
    <StyledArticlesContainer>
      <div>
        <h2>Our Articles</h2>
        {loggedInUser ? <Link to="addArticle"><button>Create New</button></Link> : <></>}
      </div>
      {
        articlesLoaded ?
          articles.length > 0
            ?
            <section>
              <div>
                {
                  articles.map(article =>
                    <ArticleCard
                      key={article.id}
                      data={article}
                    />
                  )
                }
              </div></section>
            :
            <p>Therea are no articles</p>
          :
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="loading..." />
      }
    </StyledArticlesContainer>
  );
}

export default Home;