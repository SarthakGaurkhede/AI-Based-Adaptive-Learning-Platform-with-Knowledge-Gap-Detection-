import {
  FaHome,
  FaBook,
  FaUsers,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-5 fixed">

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-violet-600">
          AI Learning
        </h1>

        <p className="text-gray-400">
          Teacher Panel
        </p>
      </div>

      <ul className="space-y-4">

        <li className="flex items-center gap-3 p-3 bg-violet-100 rounded-lg text-violet-700 cursor-pointer">
          <FaHome />
          Dashboard
        </li>

        <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
          <FaBook />
          Courses
        </li>

        <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
          <FaUsers />
          Students
        </li>

        <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
          <FaChartBar />
          Analytics
        </li>

        <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
          <FaUser />
          Profile
        </li>

      </ul>

      <div className="absolute bottom-8">
        <button className="flex items-center gap-3 text-red-500">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
