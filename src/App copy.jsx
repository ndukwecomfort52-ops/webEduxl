// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/external/Home";
// import Navbar from "./components/layout/nav/Navbar";
// import "./styles/App.css";
// import About from "./pages/external/About";
// import Footer from "./components/layout/Footer";
// import Services from "./pages/external/Services";
// import Contact from "./pages/external/Contact";
// import ScrollToTop from "./components/ScrollToTop";
// // import Login from "./pages/auth/Login";
// // import Register from "./pages/auth/Register";
// import UserDashboard from "./pages/user/Dashboard";
// import CreatePublicEvent from "./pages/events/CreatePublicEvent";
// import PublicEventList from "./pages/events/PublicEventList";
// import PaginatedPublicEventList from "./pages/events/PaginatedEventList";
// import EventDetail from "./pages/events/EventDetail";
// import PaymentComponent from "./pages/events/PaymentComponent";
// import FreeTicketComponent from "./pages/events/FreeTicketComponent";
// import SuccessPage from "./pages/events/SuccessPage";
// import { Toaster } from "react-hot-toast";
// import { SpeedInsights } from "@vercel/speed-insights/react";
// import { Analytics } from "@vercel/analytics/react";
// import ClanDetail from "./pages/clan/ClanDetail";
// import ClanSubscription from "./pages/clan/ClanSubscription";
// import Verify from "./pages/clan/Verify";
// import Page404 from "./pages/external/404Page";
// import { useRouteVisibility } from "./components/hooks/RouteVisibility";
// import MessagesDashboard from "./components/dashboard/messages/index";
// import NotificationDashboard from "./components/dashboard/notifications/index";
// import EmergencyDashboard from "./components/dashboard/emergency/index";
// import ProfileSettings from "./components/dashboard/settings/index";
// import EstateDashboard from "./components/dashboard/analytics/index";
// import AdminDashboard from "./pages/admin/Dashboard";
// import AdminLayout from "./components/layout/AdminLayout";
// import AdminPrivateRoute from "./components/utils/AdminPrivateRoute";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import CreateEstate from "./pages/clan/CreateClan";
// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import PrivateRoutes from "./pages/auth/PrivateRoutes";
// import EstateAdminPrivateRoute from "./components/utils/EstateAdminPrivateRoute";
// import EstateLoadingScreen from "./pages/Estate/EstateLoadingScreen";
// import EstateAdminLayout from "./pages/Estate/EstateAdminLayout";
// import User from "./pages/Estate/User";
// import HouseholdsScreen from "./pages/Estate/HouseholdsScreen";
// import HouseholdDetails from "./pages/Estate/HouseholdDetails";
// import WalletScreen from "./pages/Estate/WalletScreen";
// import CreateDueScreen from "./pages/Estate/CreateDueScreen";
// // import SuperadminLogin from "./pages/auth/SuperadminLogin";
// // import SuperadminLogin from "./pages/Auth/SuperadminLogin";
// import ClanDetails from "./pages/admin/ClanDetails";
// import UserProfile from "./pages/Estate/UserProfile";
// import CreateUser from "./pages/Estate/CreateUser";
// import MarketPlace from "./pages/Estate/MarketPlace";
// // import UserStatus from "./pages/Estate/Userstatus";
// import SuperAdminMarketPlace from "./pages/superadmin/SuperAdminMarketPlace";
// import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
// import HappyLand from "./pages/external/HappyLand";
// import Visitor from "./pages/Estate/Visitor";
// import Annoucement from "./pages/superadmin/Annoucement";
// // import AdminForum from "./pages/Estate/AdminForum";
// // import SuperAdminForum from "./pages/superadmin/SuperAdminForum";
// import Errands from "./pages/admin/Errands";
// import SuperadminLogin from "./pages/auth/SuperadminLogin";
// import PhysicalDeviceClanScreen from "./pages/superadmin/PhysicalDeviceClanScreen";
// import TransactionsTable from "./pages/CaptainCourt/Dashboard";
// import AllUserWalletsTable from "./pages/CaptainCourt/AllUserWalletsTable";
// import CaptainNepabill from "./pages/admin/CaptainNepabill";
// import MonthlyTransactionTable from "./pages/admin/MonthlyTransactionTable";
// import HouseholdDues from "./pages/Estate/HouseHoldDues";
// import HouseholdDueDetail from "./pages/Estate/HouseholdDueDetail";
// import SaveHaven from "./pages/admin/SafeHaven/SaveHaven";
// import SaveHavenDetail from "./pages/admin/SafeHaven/SaveHavenDetail";
// import GeneralDues from "./pages/Estate/generalDues/GeneralDues";
// import GeneralDuesDetail from "./pages/Estate/generalDues/Generalduesdetail";
// import AdminPolls from "./pages/Estate/AdminPolls";


// const apiUrl = import.meta.env.VITE_API_URL;
// const publicKey = import.meta.env.VITE_PUBLIC_KEY;

// console.log(apiUrl, publicKey);

// // QueryClient Configuration
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//     },
//   },
// });
// function App() {
//   const { shouldShowNav, shouldShowFooter, is404 } = useRouteVisibility();

//   return (
//     <div>
//       <QueryClientProvider client={queryClient}>
//         <Toaster position="top-right" />
//         <SpeedInsights />
//         <Analytics />
//         <ScrollToTop />
//         {shouldShowNav && !is404 && <Navbar />}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           {/* <Route path="/happy-land" element={<HappyLand />} /> */}
//           <Route path="/updateaddress" element={<HappyLand />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/super-admin-login" element={<SuperadminLogin />} />
//           <Route path="/events" element={<PublicEventList />} />
//           <Route path="/list" element={<PaginatedPublicEventList />} />
//           <Route path="/public-event/:slug" element={<EventDetail />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route
//             path="/public-event/payment/:eventId"
//             element={<PaymentComponent />}
//           />
//           <Route path="/success" element={<SuccessPage />} />
//           <Route path="/payments/:clanId" element={<ClanSubscription />} />
//           <Route path="/verify" element={<Verify />} />
//           <Route path="/settings" element={<ProfileSettings />} />
//           <Route path="*" element={<Page404 />} />

//           {/* Admin Routes */}
//           <Route path="admin-dashboard-service" element={<AdminPrivateRoute />}>
//             <Route element={<AdminLayout />}>
//               {/* <Route path="admin" element={<EstateDashboard />} /> */}
//               <Route path="estates" element={<AdminDashboard />} />
//               <Route path="emergencies" element={<EmergencyDashboard />} />
//               <Route path="messages" element={<MessagesDashboard />} />
//               <Route path="notifications" element={<NotificationDashboard />} />
//               <Route path="clan/create" element={<CreateEstate />} />
//               <Route path="settings" element={<ProfileSettings />} />
//               <Route path="estates/:clanId" element={<ClanDetails />} />
//             </Route>
//           </Route>

//           {/* Admin Routes this is the super admin route */}
//           <Route path="/dashboard" element={<AdminPrivateRoute />}>
//             <Route element={<AdminLayout />}>
//               <Route path="admin" element={<EstateDashboard />} />
//               <Route path="estates" element={<AdminDashboard />} />
//               <Route path="captain" element={<CaptainNepabill />} />
//               <Route path="SaveHaven" element={<SaveHaven />} />

//               <Route path="captain_allalal" element={<AllUserWalletsTable />} />
//               <Route path="credit_wallet" element={<TransactionsTable />} />
//               <Route path="errands" element={<Errands />} />
//               <Route path="estates" element={<SuperAdminDashboard />} />
//               <Route path="transaction" element={<EmergencyDashboard />} />
//               <Route path="messages" element={<MessagesDashboard />} />
//               <Route path="notifications" element={<NotificationDashboard />} />
//               <Route path="market-place" element={<SuperAdminMarketPlace />} />
//               <Route path="annoucement" element={<Annoucement />} />
//               <Route path="physical" element={<PhysicalDeviceClanScreen />} />
//               <Route
//                 path="monthly-table"
//                 element={<MonthlyTransactionTable />}
//               />
//               <Route
//                 path="safehaven/:accountNumber"
//                 element={<SaveHavenDetail />}
//               />
//               <Route path="clan/detail/:clanId" element={<ClanDetail />} />
//               <Route path="clan/create" element={<CreateEstate />} />
//               <Route path="settings" element={<ProfileSettings />} />
//             </Route>
//           </Route>

//           <Route path="/estate-admin" element={<EstateAdminPrivateRoute />}>
//             <Route element={<EstateAdminLayout />}>
//               <Route path="" element={<EstateLoadingScreen />} />
//               <Route path="user" element={<User />} />
//               <Route path="poll" element={<AdminPolls />} />
//               <Route path="meter" element={<TransactionsTable />} />
//               <Route path="user-profile" element={<CreateUser />} />
//               <Route path="user-profile/:id" element={<UserProfile />} />
//               <Route path="admin" element={<EstateDashboard />} />
//               <Route path="estates" element={<AdminDashboard />} />
//               <Route path="payments" element={<WalletScreen />} /> 
//               <Route path="createdue" element={<CreateDueScreen />} />
//               <Route path="household" element={<HouseholdsScreen />} />
//               <Route path="household-dues" element={<HouseholdDues />} />
//               <Route path="general-dues" element={<GeneralDues />} />
//               <Route path="visitors-history" element={<Visitor />} />
//               {/* <Route path="forum" element={<AdminForum />} /> */}

//               <Route path="household/:id" element={<HouseholdDetails />} />
//               <Route
//                 path="household-dues/:id"
//                 element={<HouseholdDueDetail />}
//               />

//               <Route path="general-dues/:id" element={<GeneralDuesDetail />} />
//               <Route path="market-place" element={<MarketPlace />} />

//               {/* <Route path="household" element={<HouseholdsScreen />} /> */}
//               <Route path="messages" element={<MessagesDashboard />} />
//               <Route path="notifications" element={<NotificationDashboard />} />
//               <Route path="clan/detail/:clanId" element={<ClanDetail />} />
//               <Route path="clan/create" element={<CreateEstate />} />
//               <Route path="settings" element={<ProfileSettings />} />
//             </Route>
//           </Route>

//           {/* Private Routes */}
//           <Route path="/" element={<PrivateRoutes />}>
//             <Route path="dashboard/user" element={<UserDashboard />} />
//             <Route
//               path="free-event/payment/:eventId"
//               element={<FreeTicketComponent />}
//             />
//             <Route path="event" element={<CreatePublicEvent />} />

//             <Route path="clan/detail/:clanId" element={<ClanDetail />} />
//           </Route>
//         </Routes>
//         {shouldShowFooter && !is404 && <Footer />}
//       </QueryClientProvider>
//     </div>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import "./styles/App.css";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/layout/nav/Navbar";
import Footer from "./components/layout/Footer";
import AdminLayout from "./components/layout/AdminLayout";
import AdminPrivateRoute from "./components/utils/AdminPrivateRoute";
import EstateAdminPrivateRoute from "./components/utils/EstateAdminPrivateRoute";
import { useRouteVisibility } from "./components/hooks/RouteVisibility";

// Public pages
import Home from "./pages/external/Home";
import About from "./pages/external/About";
import Services from "./pages/external/Services";
import Contact from "./pages/external/Contact";
import Page404 from "./pages/external/404Page";
import HappyLand from "./pages/external/HappyLand";

// Auth
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import SuperadminLogin from "./pages/auth/SuperadminLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PrivateRoutes from "./pages/auth/PrivateRoutes";

// Public events
import CreatePublicEvent from "./pages/events/CreatePublicEvent";
import PublicEventList from "./pages/events/PublicEventList";
import PaginatedPublicEventList from "./pages/events/PaginatedEventList";
import EventDetail from "./pages/events/EventDetail";
import PaymentComponent from "./pages/events/PaymentComponent";
import FreeTicketComponent from "./pages/events/FreeTicketComponent";
import SuccessPage from "./pages/events/SuccessPage";

// Clan / subscription
import ClanDetail from "./pages/clan/ClanDetail";
import ClanSubscription from "./pages/clan/ClanSubscription";
import Verify from "./pages/clan/Verify";
import CreateEstate from "./pages/clan/CreateClan";

// User dashboard
import UserDashboard from "./pages/user/Dashboard";

// Dashboard widgets shared across multiple admin layouts
import MessagesDashboard from "./components/dashboard/messages/index";
import NotificationDashboard from "./components/dashboard/notifications/index";
import EmergencyDashboard from "./components/dashboard/emergency/index";
import ProfileSettings from "./components/dashboard/settings/index";
import EstateDashboard from "./components/dashboard/analytics/index";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import ClanDetails from "./pages/admin/ClanDetails";
import Errands from "./pages/admin/Errands";
import CaptainNepabill from "./pages/admin/CaptainNepabill";
import MonthlyTransactionTable from "./pages/admin/MonthlyTransactionTable";
import SaveHaven from "./pages/admin/SafeHaven/SaveHaven";
import SaveHavenDetail from "./pages/admin/SafeHaven/SaveHavenDetail";

// Super admin
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminMarketPlace from "./pages/superadmin/SuperAdminMarketPlace";
import Annoucement from "./pages/superadmin/Annoucement";
import PhysicalDeviceClanScreen from "./pages/superadmin/PhysicalDeviceClanScreen";

// Captain Court
import TransactionsTable from "./pages/CaptainCourt/Dashboard";
import AllUserWalletsTable from "./pages/CaptainCourt/AllUserWalletsTable";

// Estate admin
import EstateLoadingScreen from "./pages/Estate/EstateLoadingScreen";
import EstateAdminLayout from "./pages/Estate/EstateAdminLayout";
import User from "./pages/Estate/User";
import HouseholdsScreen from "./pages/Estate/HouseholdsScreen";
import HouseholdDetails from "./pages/Estate/HouseholdDetails";
import WalletScreen from "./pages/Estate/WalletScreen";
import CreateDueScreen from "./pages/Estate/CreateDueScreen";
import UserProfile from "./pages/Estate/UserProfile";
import CreateUser from "./pages/Estate/CreateUser";
import MarketPlace from "./pages/Estate/MarketPlace";
import Visitor from "./pages/Estate/Visitor";
import HouseholdDues from "./pages/Estate/HouseHoldDues";
import HouseholdDueDetail from "./pages/Estate/HouseholdDueDetail";
import GeneralDues from "./pages/Estate/generalDues/GeneralDues";
import GeneralDuesDetail from "./pages/Estate/generalDues/Generalduesdetail";
import AdminPolls from "./pages/Estate/AdminPolls";
import ArtisanScreen from "./pages/Estate/Artisanscreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// These routes are identical across admin-dashboard-service, /dashboard
// (super admin), and /estate-admin. Defined once and reused below instead
// of being copy-pasted into each layout.
const sharedDashboardRoutes = [
  { path: "messages", element: <MessagesDashboard /> },
  { path: "notifications", element: <NotificationDashboard /> },
  { path: "settings", element: <ProfileSettings /> },
  { path: "clan/create", element: <CreateEstate /> },
  { path: "clan/detail/:clanId", element: <ClanDetail /> },
];

function App() {
  const { shouldShowNav, shouldShowFooter, is404 } = useRouteVisibility();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <SpeedInsights />
        <Analytics />
        <ScrollToTop />
        {shouldShowNav && !is404 && <Navbar />}

        <Routes>
          {/* ---------- Public ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/updateaddress" element={<HappyLand />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/super-admin-login" element={<SuperadminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/settings" element={<ProfileSettings />} />

          {/* Public events */}
          <Route path="/events" element={<PublicEventList />} />
          <Route path="/list" element={<PaginatedPublicEventList />} />
          <Route path="/public-event/:slug" element={<EventDetail />} />
          <Route
            path="/public-event/payment/:eventId"
            element={<PaymentComponent />}
          />
          <Route path="/success" element={<SuccessPage />} />

          {/* Clan subscription / verification */}
          <Route path="/payments/:clanId" element={<ClanSubscription />} />
          <Route path="/verify" element={<Verify />} />

          <Route path="*" element={<Page404 />} />

          {/* ---------- Admin (service-level) ---------- */}
          <Route path="admin-dashboard-service" element={<AdminPrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="estates" element={<AdminDashboard />} />
              <Route path="emergencies" element={<EmergencyDashboard />} />
              <Route path="estates/:clanId" element={<ClanDetails />} />
              {sharedDashboardRoutes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
            </Route>
          </Route>

          {/* ---------- Super admin (/dashboard) ---------- */}
          <Route path="/dashboard" element={<AdminPrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="admin" element={<EstateDashboard />} />
              {/*
                FLAG: the original file declared path="estates" twice here —
                once pointing to AdminDashboard, once to SuperAdminDashboard.
                Only the first match is ever reachable, so AdminDashboard was
                silently dead code. Since this whole block is commented as the
                "super admin" section, SuperAdminDashboard is kept below.
                Double-check this is the intended component for /dashboard/estates.
              */}
              <Route path="estates" element={<SuperAdminDashboard />} />
              <Route path="captain" element={<CaptainNepabill />} />
              <Route path="SaveHaven" element={<SaveHaven />} />
              <Route path="captain_allalal" element={<AllUserWalletsTable />} />
              <Route path="credit_wallet" element={<TransactionsTable />} />
              <Route path="errands" element={<Errands />} />
              <Route path="transaction" element={<EmergencyDashboard />} />
              <Route path="market-place" element={<SuperAdminMarketPlace />} />
              <Route path="annoucement" element={<Annoucement />} />
              <Route path="physical" element={<PhysicalDeviceClanScreen />} />
              <Route path="monthly-table" element={<MonthlyTransactionTable />} />
              <Route
                path="safehaven/:accountNumber"
                element={<SaveHavenDetail />}
              />
              {sharedDashboardRoutes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
            </Route>
          </Route>

          {/* ---------- Estate admin ---------- */}
          <Route path="/estate-admin" element={<EstateAdminPrivateRoute />}>
            <Route element={<EstateAdminLayout />}>
              <Route path="" element={<EstateLoadingScreen />} />
              <Route path="user" element={<User />} />
              <Route path="poll" element={<AdminPolls />} />
              <Route path="meter" element={<TransactionsTable />} />
              <Route path="user-profile" element={<CreateUser />} />
              <Route path="user-profile/:id" element={<UserProfile />} />
              <Route path="admin" element={<EstateDashboard />} />
              <Route path="estates" element={<AdminDashboard />} />
              <Route path="payments" element={<WalletScreen />} />
              <Route path="createdue" element={<CreateDueScreen />} />
              <Route path="artisan-screen" element={<ArtisanScreen />} />
              <Route path="household" element={<HouseholdsScreen />} />
              <Route path="household/:id" element={<HouseholdDetails />} />
              <Route path="household-dues" element={<HouseholdDues />} />
              <Route
                path="household-dues/:id"
                element={<HouseholdDueDetail />}
              />
              <Route path="general-dues" element={<GeneralDues />} />
              <Route path="general-dues/:id" element={<GeneralDuesDetail />} />
              <Route path="visitors-history" element={<Visitor />} />
              <Route path="market-place" element={<MarketPlace />} />
              {sharedDashboardRoutes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
            </Route>
          </Route>

          {/* ---------- Authenticated user routes ---------- */}
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="dashboard/user" element={<UserDashboard />} />
            <Route
              path="free-event/payment/:eventId"
              element={<FreeTicketComponent />}
            />
            <Route path="event" element={<CreatePublicEvent />} />
            <Route path="clan/detail/:clanId" element={<ClanDetail />} />
          </Route>
        </Routes>

        {shouldShowFooter && !is404 && <Footer />}
      </QueryClientProvider>
    </div>
  );
}

export default App;