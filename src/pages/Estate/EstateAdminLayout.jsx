// // // import { useState } from "react";
// // // import { Outlet } from "react-router-dom";
// // // // import Header from "./nav/Header";
// // // // import Sidebar from "./nav/SideNav";
// // // // import { MdOutlineDashboard } from "react-icons/md";
// // // import {
// // //   IoStatsChart,
// // //   // IoMailUnreadSharp,
// // //   // IoNotificationsSharp,
// // // } from "react-icons/io5";
// // // import { IoMdAlert } from "react-icons/io";
// // // import { FaBuildingColumns } from "react-icons/fa6";
// // // import { BsShop } from "react-icons/bs";
// // // import { FaHistory } from "react-icons/fa";
// // // import { FaHouseChimneyUser } from "react-icons/fa6";
// // // import { MessageSquare } from "lucide-react";
// // // // import { FaHistory } from "react-icons/fa6";

// // // // import Header from "./nav/Header";
// // // import Header from "./layout/nav/Header";
// // // import Sidebar from "./layout/nav/SideNav";
// // // import { useSelector } from "react-redux";

// // // const adminNavData = [
// // //   { path: "/estate-admin", label: "Estates", icon: FaBuildingColumns },
// // //   { path: "/estate-admin/user", label: "Dashboard", icon: IoStatsChart },
// // //   { path: "/estate-admin/payments", label: "Payments", icon: IoMdAlert },
// // //   {
// // //     path: "/estate-admin/household",
// // //     label: "Household",
// // //     icon: FaHouseChimneyUser,
// // //   },
// // //   {
// // //     path: "/estate-admin/market-place",
// // //     label: "Market Place",
// // //     icon: BsShop,
// // //   },
// // //   // {
// // //   //   path: "/estate-admin/forum",
// // //   //   label: "Forum",
// // //   //   icon: MessageSquare,
// // //   // },
// // //   {
// // //     path: "/estate-admin/visitors-history",
// // //     label: "Visitors History",
// // //     icon: FaHistory,
// // //   },
// // // ];

// // // const EstateAdminLayout = () => {
// // //   const [isSidebarOpen, setSidebarOpen] = useState(false);

// // //   const { user } = useSelector((state) => state?.reducer?.AuthSlice);
// // //   // const token = user?.token;

// // //   console.log({
// // //     fgf: user,
// // //   });
// // //   captainscourtestate1@gmail.com
// // //   // Toggle function for sidebar
// // //   const toggleSidebar = () => {
// // //     setSidebarOpen(!isSidebarOpen);
// // //   };

// // //   return (
// // //     <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] grid-rows-[auto_1fr] h-screen hide-scrollbar">
// // //       {isSidebarOpen && (
// // //         <div
// // //           className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
// // //           onClick={toggleSidebar}
// // //         ></div>
// // //       )}
// // //       <Sidebar
// // //         navData={adminNavData}
// // //         className={`${
// // //           isSidebarOpen ? "block" : "hidden"
// // //         } lg:block absolute lg:relative z-20`}
// // //       />

// // //       <Header toggleSidebar={toggleSidebar} />

// // //       <div className="col-span-1 lg:col-start-2 lg:py-4 overflow-scroll hide-scrollbar p-4 border border-r-2">
// // //         <Outlet />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default EstateAdminLayout;

// // import { useState, useMemo } from "react";
// // import { Outlet } from "react-router-dom";
// // import { IoStatsChart, IoAlertCircle } from "react-icons/io5";
// // import { FaBuildingColumns } from "react-icons/fa6";
// // import { BsShop } from "react-icons/bs";
// // import { FaHistory } from "react-icons/fa";
// // import { FaHouseChimneyUser } from "react-icons/fa6";
// // // import { MessageSquare } from "lucide-react";

// // import Header from "./layout/nav/Header";
// // import Sidebar from "./layout/nav/SideNav";
// // import { useSelector } from "react-redux";

// // const EstateAdminLayout = () => {
// //   const [isSidebarOpen, setSidebarOpen] = useState(false);

// //   const { user } = useSelector((state) => state?.reducer?.AuthSlice);

// //   console.log({
// //     fgf: user?.user?.email,
// //   });

// //   // Dynamically build navData
// //   const adminNavData = useMemo(() => {
// //     const baseNav = [
// //       { path: "/estate-admin", label: "Estates", icon: FaBuildingColumns },
// //       { path: "/estate-admin/user", label: "Dashboard", icon: IoStatsChart },
// //       {
// //         path: "/estate-admin/payments",
// //         label: "Payments",
// //         icon: IoAlertCircle,
// //       },
// //       {
// //         path: "/estate-admin/household",
// //         label: "Household",
// //         icon: FaHouseChimneyUser,
// //       },
// //       {
// //         path: "/estate-admin/market-place",
// //         label: "Market Place",
// //         icon: BsShop,
// //       },
// //       {
// //         path: "/estate-admin/visitors-history",
// //         label: "Visitors History",
// //         icon: FaHistory,
// //       },
// //     ];

// //     // 👇 Only add Meter tab if email matches
// //     if (user?.user?.email === "captainscourtestate1@gmail.com") {
// //       baseNav.push({
// //         path: "/estate-admin/meter",
// //         label: "Meter",
// //         icon: IoStatsChart, // you can change to another icon
// //       });
// //     }

// //     return baseNav;
// //   }, [user]);

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] grid-rows-[auto_1fr] h-screen hide-scrollbar">
// //       {isSidebarOpen && (
// //         <div
// //           className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
// //           onClick={toggleSidebar}
// //         ></div>
// //       )}

// //       <Sidebar
// //         navData={adminNavData}
// //         className={`${
// //           isSidebarOpen ? "block" : "hidden"
// //         } lg:block absolute lg:relative z-20`}
// //       />

// //       <Header toggleSidebar={toggleSidebar} />

// //       <div className="col-span-1 lg:col-start-2 lg:py-4 overflow-scroll hide-scrollbar p-4 border border-r-2">
// //         <Outlet />
// //       </div>
// //     </div>
// //   );
// // };

// // export default EstateAdminLayout;

// import { useState, useMemo } from "react";
// import { Outlet } from "react-router-dom";
// import { IoStatsChart, IoAlertCircle } from "react-icons/io5";
// import { FaBuildingColumns } from "react-icons/fa6";
// import { BsShop } from "react-icons/bs";
// import { FaHistory } from "react-icons/fa";
// import { FaHouseChimneyUser } from "react-icons/fa6";

// import Header from "./layout/nav/Header";
// import Sidebar from "./layout/nav/SideNav";
// import { useSelector } from "react-redux";

// const EstateAdminLayout = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const { user } = useSelector((state) => state?.reducer?.AuthSlice);

//   console.log({
//     fgf: user?.user?.email,
//   });

//   // Dynamically build navData
//   const adminNavData = useMemo(() => {
//     const baseNav = [
//       { path: "/estate-admin", label: "Estates", icon: FaBuildingColumns },
//       { path: "/estate-admin/user", label: "Dashboard", icon: IoStatsChart },
//       {
//         path: "/estate-admin/payments",
//         label: "Payments",
//         icon: IoAlertCircle,
//       },
//       {
//         path: "/estate-admin/household",
//         label: "Household",
//         icon: FaHouseChimneyUser,
//       },

//       {
//         path: "/estate-admin/household-dues",
//         label: "DUE",
//         icon: FaHouseChimneyUser,
//       },

//       {
//         path: "/estate-admin/market-place",
//         label: "Market Place",
//         icon: BsShop,
//       },
//       {
//         path: "/estate-admin/visitors-history",
//         label: "Visitors History",
//         icon: FaHistory,
//       },
//     ];

//     // Only add Meter tab if email matches
//     if (user?.user?.email === "captainscourtestate1@gmail.com") {
//       baseNav.push({
//         path: "/estate-admin/meter",
//         label: "Meter",
//         icon: IoStatsChart,
//       });
//     }

//     return baseNav;
//   }, [user]);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         background: "#F9FAFB",
//       }}
//     >
//       {/* Mobile Overlay */}
//       {isSidebarOpen && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 40,
//             background: "rgba(0, 0, 0, 0.5)",
//           }}
//           onClick={toggleSidebar}
//           className="lg:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <Sidebar
//         navData={adminNavData}
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//       />

//       {/* Main Content */}
//       <main
//         style={{
//           flex: 1,
//           marginLeft: isSidebarOpen ? "0" : "0",
//           transition: "margin-left 0.3s ease",
//         }}
//         className="lg:ml-[280px]"
//       >
//         {/* Header */}
//         <Header toggleSidebar={toggleSidebar} />

//         {/* Page Content */}
//         <div
//           style={{
//             maxWidth: "1440px",
//             margin: "0 auto",
//             padding: "32px 24px",
//           }}
//         >
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EstateAdminLayout;

import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { IoStatsChart, IoAlertCircle } from "react-icons/io5";
import { FaBuildingColumns } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import Header from "./layout/nav/Header";
import Sidebar from "./layout/nav/SideNav";
import { useSelector } from "react-redux";

const EstateAdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useSelector((state) => state?.reducer?.AuthSlice);

  // Dynamically build navData
  const adminNavData = useMemo(() => {
    const baseNav = [
      {
        path: "/estate-admin",
        label: "Estates",
        icon: FaBuildingColumns,
      },
      {
        path: "/estate-admin/household",
        label: "Household",
        icon: FaHouseChimneyUser,
      },



          {
        path: "/estate-admin/poll",
        label: "Poll",
        icon: FaHouseChimneyUser,
      },
      {
        path: "/estate-admin/household-dues",
        label: "Dues",
        icon: FaHouseChimneyUser,
      },


      {
        path: "/estate-admin/artisan-screen",
        label: "Artisan Screen",
        icon: FaHouseChimneyUser,
      },

      {
        path: "/estate-admin/user",
        label: "Dashboard",
        icon: IoStatsChart,
      },
      {
        path: "/estate-admin/payments",
        label: "Payments",
        icon: IoAlertCircle,
      },

      {
        path: "/estate-admin/market-place",
        label: "Market Place",
        icon: BsShop,
      },
      {
        path: "/estate-admin/visitors-history",
        label: "Visitors History",
        icon: FaHistory,
      },
      {
        path: "/estate-admin/general-dues",
        label: "General Dues",
        icon: FaHouseChimneyUser,
      },
    ];

    // Only add Meter tab if email matches
    if (user?.user?.email === "captainscourtestate1@gmail.com") {
      baseNav.push({
        path: "/estate-admin/meter",
        label: "Meter",
        icon: IoStatsChart,
      });
    }

    return baseNav;
  }, [user]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        navData={adminNavData}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EstateAdminLayout;
