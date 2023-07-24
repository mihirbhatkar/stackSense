import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "./Components/ThemeSwitcher.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "./Slices/usersApiSlice.js";
import { clearCredentials } from "./Slices/authSlices.js";
import { AiFillSetting } from "react-icons/ai";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <>
      <div>
        <div className="drawer lg:drawer-open">
          <input id="drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div
              className=" sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content"
            >
              <div className="navbar bg-base-100 font-semibold">
                <div className="flex-1">
                  <label
                    aria-label="Open menu"
                    htmlFor="drawer"
                    className="btn btn-square btn-ghost drawer-button lg:hidden"
                  >
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                    >
                      <path
                        stroke="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                  <Link className="text-3xl p-2 font-bold lg:hidden " to={"/"}>
                    🪙coinSense
                  </Link>
                </div>
                <div className="flex-none">
                  <ul className="menu menu-horizontal px-1 space-x-2">
                    <li className="mt-1 text-lg">
                      <ThemeSwitcher />
                    </li>
                    {userInfo ? (
                      <>
                        <li className="dropdown dropdown-end">
                          <label tabIndex={0} className="m-1 text-lg">
                            <AiFillSetting></AiFillSetting>
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <Link to={"/profile"}>Profile</Link>
                            </li>
                            <li>
                              <a onClick={logoutHandler}>Logout</a>
                            </li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to={"/login"}>Login</Link>
                        </li>
                        <li>
                          <Link to={"/register"}>Sign Up</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="">
              <Outlet />
            </div>
            {/* Page content here */}
          </div>
          <div className="drawer-side z-40">
            <label htmlFor="drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content text-lg">
              {/* Sidebar content here */}
              <li className="  mb-4">
                <Link className="text-3xl p-2 font-bold" to={"/"}>
                  🪙coinSense
                </Link>
              </li>

              <li>
                <Link to={"/wallets"}>Wallets</Link>
              </li>
              <li>
                <Link to={"/reports"}>Reports</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
