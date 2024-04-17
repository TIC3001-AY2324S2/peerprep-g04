import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPaginatedUserData } from "../hooks/api/user/useGetPaginatedUserData";
import { UserFormModal } from "../components/user/userFormModal";
import { CiSearch } from "react-icons/ci";

import { Button, Dropdown, TextInput } from "flowbite-react";
import { DeleteUserModal } from "../components/user/deleteUserModal";

export default function Userpage() {
  const [openAddUserFormModal, setOpenAddUserFormModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isFetching, isPending } = useGetPaginatedUserData(
    page,
    8,
    search
  );

  // ----------------------------------
  // RENDER COMPONENTS
  // ----------------------------------

  const actionButton = (user) => {
    console.log(user);
    return (
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M12 6h0m0 6h0m0 6h0"
            />
          </svg>
        )}
      >
        <Dropdown.Item
          onClick={() => {
            setOpenEditUserModal(true);
            setSelectedUser(user);
          }}
        >
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
              />
            </svg>
            <span>Edit User</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setOpenDeleteUserModal(true);
            setSelectedUser(user);
          }}
        >
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
            <span>Delete User</span>
          </div>
        </Dropdown.Item>
      </Dropdown>
    );
  };

  const renderPagination = () => {
    let pages = [];
    if (!isFetching && data) {
      const startPage = Math.max(1, page - 1);
      const endPage = Math.min(data.pageCount, page + 1);

      if (startPage > 1) {
        pages.push(
          <li key={1}>
            <p
              onClick={() => setPage(1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </p>
          </li>
        );
        pages.push(<li key={"start"}>..</li>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <li key={i}>
            <p
              onClick={() => setPage(i)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                page === i ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {i}
            </p>
          </li>
        );
      }

      if (endPage < data.pageCount) {
        pages.push(<li key={"end"}>..</li>);
        pages.push(
          <li key={data.pageCount}>
            <p
              onClick={() => setPage(data.pageCount)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {data.pageCount}
            </p>
          </li>
        );
      }
    }

    if (!isFetching && data) {
      return (
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <p
              onClick={() => data.previous && setPage(data.previous.page)}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                !data.previous ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </p>
          </li>
          {pages}
          <li>
            <p
              onClick={() => data.next && setPage(data.next.page)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                !data.next ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </p>
          </li>
        </ul>
      );
    } else {
      return <div></div>;
    }
  };

  // ----------------------------------
  // RETURN BLOCK
  // ----------------------------------
  return (
    <div className="w-3/4 max-w-7xl">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <label className="sr-only">Search</label>
          <TextInput
            type="text"
            icon={CiSearch}
            placeholder="Search for users"
            required
            autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
      {/* TABLE */}
      <div className="relative overflow-x-show shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Solved Questions
              </th>
              <th scope="col" className="px-6 py-3">
                Is Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!isPending &&
              data &&
              data.result &&
              data.result.map((item, index) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                    <td className="px-6 py-4">{item.username}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.solvedQuestions}</td>
                    <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={item.isAdmin} 
                      readOnly
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    </td>
                    <td className="px-6 py-4">{actionButton(item)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-5{" "}
          </span>
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {data && JSON.stringify(data.total)}
          </span>
        </span>
        {renderPagination()}
      </nav>

      {openDeleteUserModal && (
        <DeleteUserModal
          user={selectedUser}
          show={openDeleteUserModal}
          setOpenDeleteUserModal={setOpenDeleteUserModal}
        />
      )}

      {openEditUserModal && (
        <UserFormModal
          show={openEditUserModal}
          setOpenUserFormModal={setOpenEditUserModal}
          isEdit={true}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};
