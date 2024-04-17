/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { Dropdown, Avatar } from "flowbite-react";
import { useAuth } from "./AuthProvider";

export const NavBar = () => {
  const { user, logout } = useAuth();
  function profileComponent() {
    return (
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="flex items-center space-x-2">
            <Avatar size="xs" rounded />
            <span className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
              {user.userDetails.username}
            </span>
          </span>
        )}
      >
        <Dropdown.Header>
          <span className="block truncate text-sm font-medium">
            {user.userDetails.email}
          </span>
        </Dropdown.Header>
          <Dropdown.Item>
            <Link to="/profile">Dashboard</Link>
          </Dropdown.Item>
        <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
      </Dropdown>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="/">
            <img src="/images/pplogo.jpg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              PeerPrep
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link>
              <Link
                className="block rounded px-3 py-1 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                to={`question`}
              >
                <p style={{ marginTop: "2.5px" }}>Question</p>
              </Link>
            </Navbar.Link>
            {!user && (
              <div className="flex items-center space-x-1">
                <Navbar.Link>
                  <Link
                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    to={`register`}
                  >
                    <p style={{ marginTop: "2.5px" }}>Sign Up </p>
                  </Link>
                </Navbar.Link>
                <p className="text-gray-400">|</p>
                <Navbar.Link>
                  <Link
                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    to={`auth`}
                  >
                    <p style={{ marginTop: "2.5px" }}> Login</p>
                  </Link>
                </Navbar.Link>
              </div>
            )}
            {user && profileComponent()}
          </Navbar.Collapse>
        </Navbar>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};
