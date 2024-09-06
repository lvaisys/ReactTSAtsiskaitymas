import { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UsersContext, { UsersContextTypes } from '../../../contexts/UsersContext';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #978e36c8;
  height: 80px;
  padding: 0 10px;

  > div.headerLogo{
    display: flex;
    align-items: center;
    gap: 5px;
    height: 80%;

    > img{
      height: 100%;
    }
    > span{
      font-size: 1.1rem;
    }
  }

  > nav{
    > ul{
      display: flex;
      align-items: center;
      gap: 10px;

      margin: 0;
      padding: 0;
      
      > li{
        list-style-type: none;

        > a{
          text-decoration: none;
          font-size: 1.3rem;

          &:hover{
            color: #002547;
          }
          &.active{
            color: #064077;
            text-decoration: underline;
          }
        }
        ul{
          display: flex;
          flex-direction: column;
          align-items: center;
          
          >li {
          list-style-type: none;
          
          img {
            border-radius: 30%;
            height: fit-content;
            width: 40px;
        }
        }
        }
      }
    }
  }
`;

const Header = () => {

  const { loggedInUser, logOut } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <div className="headerLogo">
        <img
          src="https://t4.ftcdn.net/jpg/02/53/47/71/360_F_253477181_O2qhHg93BIliUXlWTXueei1RT0CAf3Pu.jpg"
          alt="Shared articles"
        />
        <span>Shared Articles</span>
      </div>
      <nav>
        <ul>
          <li><NavLink to=''>Home</NavLink></li>
          {loggedInUser ? <><li><NavLink to='addArticle'>Add Article</NavLink></li>
            <li><NavLink to='savedArticles'>Saved Articles</NavLink></li></> : <></>
          }
          {
            loggedInUser ?
              <li>
                <ul>
                  <li><img
                    src={loggedInUser.photo}
                    alt={loggedInUser.username}
                  /></li>
                  <li><span>{loggedInUser.username}</span></li>
                  <li><button
                    onClick={() => {
                      logOut();
                      navigate('/');
                    }}
                  >Logout</button></li>
                </ul>




              </li> :
              <li>
                <ul>
                  <li>
                    <button><Link to="/login">Login</Link></button>
                  </li>
                  <li>
                    <button><Link to="/register">Register</Link></button>
                  </li>
                </ul>
              </li>
          }
        </ul>
      </nav>
    </StyledHeader>
  );
}

export default Header;