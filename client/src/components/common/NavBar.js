/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useAuth } from "../common/AuthProvider";

export const NavBar = () => {
  // const { user } = useAuth();
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="/">
            <img src="pplogo.jpg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              PeerPrep
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link>
              <Link
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                to={`/`}
              >
                Home
              </Link>
            </Navbar.Link>
            <Navbar.Link>
              <Link
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                to={`question`}
              >
                Question
              </Link>
            </Navbar.Link>
            {true ? (
              <Navbar.Link>
                <Link
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  to={`auth`}
                >
                  Logout
                </Link>
              </Navbar.Link>
            ) : (
              <Navbar.Link>
                <Link
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  to={`auth`}
                >
                  Login
                </Link>
              </Navbar.Link>
            )}
            {true && (
              <Navbar.Link>
                <Link
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  to={`profile`}
                >
                  Profile
                </Link>
              </Navbar.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
      <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};
