import { NavLink } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { HiCalculator, HiClipboardList, HiCollection } from "react-icons/hi";
import { AiTwotoneHome } from "react-icons/ai";
function index() {
  return (
    <div className="flex flex-row h-screen antialiased text-blue-gray-800">
      <div className="hide-print  flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4">
        <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-cyan-500 rounded-3xl">
          <Link
            to="/"
            className="flex items-center justify-center h-10 w-10 bg-cyan-50 text-cyan-700 rounded-full"
          >
            <AiTwotoneHome className="text-2xl" />
          </Link>
          <ul className="flex flex-col space-y-2 mt-12">
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? "bg-cyan-300 shadow-lg text-white" : ""
                }
                to="/"
              >
                <span
                  className={`flex items-center justify-center h-12 w-12 rounded-2xl hover:bg-cyan-400 text-cyan-100`}
                >
                  <HiCalculator className="text-2xl" />
                </span>
              </NavLink>
            </li>
            <li>
              <Link to="/orders" className="flex items-center">
                <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
                  <HiClipboardList className="text-2xl" />
                </span>
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center">
                <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
                  <HiCollection className="text-2xl" />
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center">
                <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
          <a
            href="https://github.com/Coders-Vision/pos_management"
            target="_blank"
            className="mt-auto flex items-center justify-center text-cyan-200 hover:text-cyan-100 h-10 w-10 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center ">
        <Outlet />
      </div>
    </div>
  );
}

export default index;
