import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  // const [username, setUsername] = useState(null);
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        // setUsername(userInfo.username);
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    // setUsername(null);
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Blogs
      </Link>
      <nav>
        {username && (
          <>
          
            <a class="button-30">
              <Link to="/create">Create new post</Link>
            </a>
            <a class="button-39">
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </a>
          </>
        )}
        {!username && (
          <>
            <a class="button-39">
              {" "}
              <Link to="/login">Login</Link>
            </a>
            <a class="button-39" role="button">
              {" "}
              <Link to="/signup">SignUp</Link>
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
