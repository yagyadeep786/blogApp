import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../container/Container";
import { Link } from "react-router-dom";
import Logo from "../Logo";
function Header() {
  let authStatus = useSelector((state) => {
    return state.auth.status;
  });

  let navigate = useNavigate();

 let navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "AddPost",
      url: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "AllPost",
      url: "/all-post",
      active: authStatus,
    },
    {
      name: "SignUp",
      url: "/signup",
      active: !authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo></Logo>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.url)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn></LogoutBtn>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
