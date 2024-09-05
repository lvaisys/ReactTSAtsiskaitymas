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
  { type: "addNewUser", newUser: UserType }
export type UsersContextTypes = {
  users: UserType[],
  loggedInUser: UserType | undefined,
  toggleSaving: (id: string) => void,
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
    default:
      return state;
  }
}

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);
const UsersProvider = ({ children }: ChildrenProp) => {

  const [loggedInUser, setLoggedInUser] = useState<UserType | undefined>(undefined);

  const logIn = (username: string, password: string): boolean => {
    console.log(username, password);
    const foundUser = users.find(user => user.username === username)
    console.log('userFound ' + username + password);
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      console.log("userFound");
      setLoggedInUser(foundUser);
      return true;
    } else {
      return false;
    }
  }
  const toggleSaving = (id: string): void => {
    console.log('toggling save');
    const index = loggedInUser?.savedArticles.indexOf(id);
    if (index && index > -1) { // only splice array when item is found
      
      console.log('Removing article');
      loggedInUser?.savedArticles.splice(index, 1); // 2nd parameter means remove one item only
    } else {
      console.log('Adding article');
      loggedInUser?.savedArticles.push(id);
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
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newUser)
    })
    dispatch({
      type: "addNewUser",
      newUser: newUser
    })
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