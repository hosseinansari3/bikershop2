import { useEffect, useState } from "react";

const Pagination = ({ page, pages, changePage, pageSize, totalItems }) => {
  let middlePagination;

  const [totalpages, setTotalpages] = useState();

  useEffect(() => {
    setTotalpages(pages);
  }, [pages]);

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        className={`${
          page === idx + 1
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        } align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs  dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
        key={idx + 1}
        onClick={() => changePage(idx + 1)}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;

    middlePagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <button
            className={`${
              page === idx + 1
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            } align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs  dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
            key={startValue + idx + 1}
            disabled={page === startValue + idx + 1}
            onClick={() => changePage(startValue + idx + 1)}
          >
            {startValue + idx + 1}
          </button>
        ))}

        <button
          className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
        >
          ...
        </button>
        <button
          className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
          onClick={() => changePage(pages)}
        >
          {pages}
        </button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button
              className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
              onClick={() => changePage(1)}
            >
              1
            </button>
            <button
              className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
            >
              ...
            </button>
            <button onClick={() => changePage(startValue)}>{startValue}</button>
            {[...Array(5)].map((_, idx) => (
              <button
                className={`${
                  page === startValue + idx + 1
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                } align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs  dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => changePage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}

            <button
              className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
            >
              ...
            </button>
            <button
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
              onClick={() => changePage(pages)}
            >
              {pages}
            </button>
          </>
        );
      } else {
        let amountLeft = pages ? pages - page + 5 : null;

        middlePagination = (
          <>
            <button
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <button
              className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
            >
              ...
            </button>
            <button
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
              onClick={() => changePage(startValue)}
            >
              {startValue}
            </button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                className={`${
                  page === startValue + idx + 1
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                } align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs  dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={
                  pages < startValue + idx + 1 ? { display: "none" } : null
                }
                onClick={() => changePage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
        <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
          <span className="flex items-center font-semibold tracking-wide uppercase">
            SHOWING {pageSize * page - pageSize + 1}-
            {page === pages
              ? (pages - 1) * pageSize + totalItems - (pages - 1) * pageSize
              : pageSize * page}{" "}
            OF {totalItems}
            {console.log("pagessss: " + pages)}
            {console.log("totalUsers: " + totalItems)}
          </span>
          <div className="flex mt-2 sm:mt-auto sm:justify-end">
            <nav>
              <div className="inline-flex items-center">
                <button
                  className={`${
                    page === 1
                      ? "text-gray-400 opacity-50 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100 cursor-pointer"
                  }align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
                  onClick={() => changePage((page) => page - 1)}
                  disabled={page === 1}
                >
                  <svg
                    class="h-3 w-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>{" "}
                </button>
                {middlePagination}
                <button
                  className={`${
                    page === pages
                      ? "text-gray-400 opacity-50 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100 cursor-pointer"
                  }align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10`}
                  onClick={() => changePage((page) => page + 1)}
                  disabled={page === pages}
                >
                  <svg
                    class="h-3 w-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>{" "}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  );
};

export default Pagination;
