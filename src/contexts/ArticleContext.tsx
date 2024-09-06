import { createContext, useReducer, useEffect, useState } from "react";

type ChildrenType = { children: React.ReactElement };
export type ArticleType = {
  id: string,
  createdAt: string,
  createdby: string,
  createdbyName: string,
  createdByImage: string,
  title: string,
  description: string,
  image: string
};
type ArticleReducerActions =
  { type: "setData", allData: ArticleType[] } |
  { type: "addNew", newItem: ArticleType } |
  { type: "deleteArticle", articleId: string }

export type ArticleContextType = {
  articlesLoaded: boolean,
  articles: ArticleType[],
  addNewArticle: (newArticle: ArticleType) => void,
  deleteArticle: (articleId: string) => void,
  returnSpecificArticle: (id: string) => ArticleType | undefined
}

const reducer = (state: ArticleType[], action: ArticleReducerActions) => {
  switch (action.type) {
    case "setData":
      return action.allData;
    case "addNew":
      return [...state, action.newItem];
    case "deleteArticle":
      return state.filter(data => data.id !== action.articleId);
    default:
      return state;
  }
}

const ArticlesContext = createContext<ArticleContextType | undefined>(undefined);
const ArticlesProvider = ({ children }: ChildrenType) => {

  const [articles, dispatch] = useReducer(reducer, [],);
  const [articlesLoaded, setArticlesLoaded] = useState(false);
  const addNewArticle = (newArticle: ArticleType) => {
    fetch(`http://localhost:8080/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArticle)
    })
    dispatch({
      type: "addNew",
      newItem: newArticle
    })
  }
  const deleteArticle = (articleId: string) => {
    fetch(`http://localhost:8080/articles/${articleId}`, {
      method: "DELETE"
    })
    dispatch({
      type: "deleteArticle",
      articleId: articleId
    })
  }
  const returnSpecificArticle = (id: string) => {
    return articles.find(article => article.id === id);
  }

  useEffect(() => {
    fetch(`http://localhost:8080/articles`)
      .then(res => res.json())
      .then((data: ArticleType[]) => dispatch({
        type: "setData", allData: data
      })).then (() => setArticlesLoaded(true))
  }, []);

  return (
    <ArticlesContext.Provider
      value={{
        articlesLoaded,
        articles,
        addNewArticle,
        deleteArticle,
        returnSpecificArticle
      }}
    >
      {children}
    </ArticlesContext.Provider>
  )
}

export { ArticlesProvider };
export default ArticlesContext;