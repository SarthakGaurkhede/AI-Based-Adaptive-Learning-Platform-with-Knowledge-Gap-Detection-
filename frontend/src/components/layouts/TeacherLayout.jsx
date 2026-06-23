import { useState } from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../../pages/teacher/Navbar";

const TeacherLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Navbar setOpen={setOpen} />

        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>

    </div>
  );
};

export default TeacherLayout;