import { useContext } from "react";
import UsersContext, { UsersContextTypes } from "./contexts/UsersContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import MainOutlet from "./components/outlets/MainOutlet";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import SavedArticles from "./components/pages/SavedArticles";
import AddArticle from "./components/pages/AddArticle";

const App = () => {
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  return (
    <Routes>
      <Route path='' element={<MainOutlet />}>
        <Route index element={<Home />} />
        <Route path='login' element={!loggedInUser ? <Login /> : <Navigate to='/' />} />
        <Route path='register' element={!loggedInUser ? <Register /> : <Navigate to='/' replace />} />
        <Route path='addArticle' element={loggedInUser ? <AddArticle /> : <Navigate to='/login' replace />} />
        <Route path='savedArticles' element={loggedInUser ? <SavedArticles /> : <Navigate to='/login' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
