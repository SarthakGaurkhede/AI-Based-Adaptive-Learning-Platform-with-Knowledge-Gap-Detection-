import { FaBell, FaBars } from "react-icons/fa";
import banner from "../../assests/images/banner.png";

const Navbar = ({ setOpen }) => {
  return (
    <div className="bg-white shadow px-4 py-4 flex justify-between items-center">

      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-xl"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </button>

         

        <h1 className="font-bold text-lg">
          Teacher Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <FaBell className="text-xl" />

        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;