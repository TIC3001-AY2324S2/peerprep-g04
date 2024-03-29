import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetPaginatedQuestionData } from "../hooks/api/question/useGetPaginatedQuestions";
import { QuestionFormModal } from "../components/question/questionFormModal";
import { CiSearch } from "react-icons/ci";

import { Button, Card, Dropdown, TextInput } from "flowbite-react";
import { DeleteQuestionModal } from "../components/question/deleteQuestionModal";

export const QuestionPage = () => {
  const [openAddQuestionFormModal, setOpenAddQuestionFormModal] =
    useState(false);
  const [openDeleteQuestionModal, setOpenDeleteQuestionModal] = useState(false);
  const [openEditQuestionModal, setOpenEditQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isFetching, isPending } = useGetPaginatedQuestionData(
    page,
    8,
    search
  );

  // ----------------------------------
  // RENDER COMPONENTS
  // ----------------------------------

  const actionButton = (question) => {
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
            setOpenEditQuestionModal(true);
            setSelectedQuestion(question);
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
            <span>Edit Question</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setOpenDeleteQuestionModal(true);
            setSelectedQuestion(question);
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
            <span>Delete Question</span>
          </div>
        </Dropdown.Item>
      </Dropdown>
    );
  };

  const cardComponent = (label, description, imageUrl) => {
    return (
      <Card
        href="#"
        className="max-w-sm mt-10 mb-10"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <h5 className="text-2xl font-bold tracking-tight text-white">
          {label}
        </h5>
        <p className="font-normal text-white ">{description}</p>
      </Card>
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
      <div className="flex flex-column justify-between">
        {cardComponent(
          "Match with other users now",
          "In PeerPrep, you can match with other users and work on solutions together!",
          "https://static.vecteezy.com/system/resources/previews/001/217/210/non_2x/binary-code-background-vector.jpg"
        )}
        {cardComponent(
          "Top interview questions",
          "Here are the top questions we have collated by various companies which were used in real interviews.",
          "https://png.pngtree.com/background/20221206/original/pngtree-digital-futuristic-binary-code-number-background-picture-image_1982388.jpg"
        )}
        {cardComponent(
          "Top 10 Questions",
          "Try out these top questions favourited by many users.",
          "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-technology-cool-background-code-image_17634.jpg"
        )}
      </div>
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <label className="sr-only">Search</label>
          <TextInput
            type="text"
            icon={CiSearch}
            placeholder="Search for questions"
            required
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* ADD QUESTION BUTTON */}
        <div>
          <Button onClick={() => setOpenAddQuestionFormModal(true)}>
            Add New Question
          </Button>
          <QuestionFormModal
            show={openAddQuestionFormModal}
            setOpenQuestionFormModal={setOpenAddQuestionFormModal}
          />
        </div>
      </div>
      {/* TABLE */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Complexity
              </th>
              <th scope="col" className="px-6 py-3">
                Description
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
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <td
                        className="block cursor-pointer rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                        onClick={() => navigate(`/question/${item._id}`)}
                      >
                        {item.title}
                      </td>
                    </th>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.complexity}</td>
                    <td className="px-6 py-4">{item.description}</td>
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

      {openDeleteQuestionModal && (
        <DeleteQuestionModal
          question={selectedQuestion}
          show={openDeleteQuestionModal}
          setOpenDeleteQuestionModal={setOpenDeleteQuestionModal}
        />
      )}

      {openEditQuestionModal && (
        <QuestionFormModal
          show={openEditQuestionModal}
          setOpenQuestionFormModal={setOpenEditQuestionModal}
          isEdit={true}
          selectedQuestion={selectedQuestion}
        />
      )}
    </div>
  );
};
