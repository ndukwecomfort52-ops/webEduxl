// import PropTypes from "prop-types";
// import SearchInput from "@/components/utils/SearchInput";
// import UserAvatar from "@/components/utils/UserAvatar";
// import { CgMenuGridO } from "react-icons/cg";

// /**
//  * Header component that displays the top navigation bar with a hamburger menu for mobile view,
//  * a search input field, and a user avatar.
//  * The hamburger menu toggles the sidebar visibility.
//  *
//  * @component
//  * @example
//  * const toggleSidebar = () => { console.log('Sidebar toggled'); };
//  * return <Header toggleSidebar={toggleSidebar} />;
//  *
//  * @param {Object} props - The props for the component.
//  * @param {Function} props.toggleSidebar - Function to toggle the sidebar visibility.
//  *
//  * @returns {JSX.Element} The rendered header component.
//  */

// const Header = ({ toggleSidebar }) => {
//   return (
//     <div className="w-full px-4 py-6 border-b flex justify-between">
//       {/* Hamburger menu icon for mobile */}
//       <div className="w-full flex lg:hidden gap-4 items-center justify-between">
//         <h1 className="md:hidden font-bold text-2xl text-green-500">Pause Point</h1>
//         <CgMenuGridO
//           className="text-tremor-content-emphasis text-3xl text-green-500 cursor-pointer"
//           onClick={toggleSidebar}
//         />
//       </div>
//       <SearchInput />
//       <UserAvatar />
//     </div>
//   );
// };

// // PropTypes validation
// Header.propTypes = {
//   toggleSidebar: PropTypes.func.isRequired,
// };

// export default Header;

import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Logo for Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">PP</span>
            </div>
            <span className="text-lg font-bold text-gray-900">PausePoint</span>
          </div>

          {/* Search Bar - Hidden on small mobile */}
          <div className="hidden sm:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* User Info */}
          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200">
            {/* Avatar */}
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user?.user?.name?.charAt(0) || "U"}
              </span>
            </div>

            {/* User Details */}
            <div className="hidden lg:block">
              <div className="text-sm font-semibold text-gray-900 leading-tight">
                {selectedEstate?.name || "Select Estate"}
              </div>
              <div className="text-xs text-gray-500 leading-tight">
                {user?.user?.email || "Admin"}
              </div>
            </div>

            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
