import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from './contexts/UsersContext';
import { ArticlesProvider } from './contexts/ArticleContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);
root.render(

  <BrowserRouter>
    <UsersProvider>
      <ArticlesProvider>
        <App />
      </ArticlesProvider>
    </UsersProvider>
  </BrowserRouter>
);
