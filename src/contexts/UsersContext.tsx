import { createContext, useReducer, useState, useEffect } from "react";
import bcrypt from 'bcryptjs';

type ChildrenProp = { children: React.ReactElement };
export type UserType = {
  id: string,
  email: string,
  username: string,
  photo: string,
  DOB: string,
  password: string,
  savedArticles: string[]
};
type UsersReducerActionTypes =
  { type: "setUsers", allData: UserType[] } |
  { type: "addNewUser", newUser: UserType } |
  { type: "toggleSaving", userId: string, articleArray: string[]}
export type UsersContextTypes = {
  users: UserType[],
  loggedInUser: UserType | undefined,
  toggleSaving: (userId: string, oldArticleArray: string[], newArticleId: string) => void,
  addNewUser: (newUser: UserType) => void,
  logIn: (username: string, password: string) => boolean,
  logOut: () => void,
}

const reducer = (state: UserType[], action: UsersReducerActionTypes) => {
  switch (action.type) {
    case "setUsers":
      return action.allData;
    case 'addNewUser':
      return [...state, action.newUser];
    case 'toggleSaving':
      return state;
    default:
      return state;
  }
}

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);
const UsersProvider = ({ children }: ChildrenProp) => {

  const [loggedInUser, setLoggedInUser] = useState<UserType | undefined>(undefined);

  const logIn = (username: string, password: string): boolean => {
    const foundUser = users.find(user => user.username === username)
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      setLoggedInUser(foundUser);
      return true;
    } else {
      return false;
    }
  }
  const logOut = () => {
    setLoggedInUser(undefined);
  }

  const [users, dispatch] = useReducer(reducer, []);
  const addNewUser = (newUser: UserType) => {
    fetch(`http://localhost:8080/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    dispatch({
      type: "addNewUser",
      newUser: newUser
    })
  }

  const toggleSaving = (userId: string, oldArticleArray: string[], newArticleId: string): void => {
    const index = oldArticleArray.indexOf(newArticleId);
    if (index > -1) { 
      console.log(index);
      oldArticleArray.splice(index);
    } else {
      oldArticleArray.push(newArticleId);
    }
    console.log(oldArticleArray);
    fetch(`http://localhost:8080/users/${loggedInUser?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ savedArticles: oldArticleArray })
    });
    dispatch({
      type: "toggleSaving",
      userId: userId, articleArray: oldArticleArray
    });
  }
  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(data => dispatch({
        type: 'setUsers',
        allData: data
      }))
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        loggedInUser,
        addNewUser,
        toggleSaving,
        logIn,
        logOut
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export { UsersProvider };
export default UsersContext;