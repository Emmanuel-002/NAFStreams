import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Scroll, UsersIcon, Video } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const isChatPage = location.pathname?.startsWith("/chat");

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();

  return (
    <div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown z-30">
      <div tabindex="1" role="button" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg> */}
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li onClick={handleClick}>
          <Link
                    to="/community"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                      currentPath === "/community" ? "btn-active" : ""
                    }`}
                  >
                    <UsersIcon className="size-5 text-base-content opacity-70" />
                    <span>Community</span>
                  </Link>
        </li>
        <li onClick={handleClick}>
          <Link
                    to="/about"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                      currentPath === "/about" ? "btn-active" : ""
                    }`}
                  >
                    <Scroll className="size-5 text-base-content opacity-70" />
                    <span>About</span>
                  </Link>
        </li>
        <li onClick={handleClick}>
            <Link
                    to="/profile"
                  >
                    <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
                Online
            </p>
          </div>
        </div>
      </div>
                  </Link>
        </li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <Link to="/" className="flex items-center gap-1">
                <Video className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  NAFStreams
                </span>
              </Link>
  </div>
  <div class="navbar-end">
    <ThemeSelector />
    {/* <button class="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
    </button> */}
    <Link to="/notifications">
    <button class="btn btn-ghost btn-circle">
      <div class="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
        {/* <span class="badge badge-xs badge-primary indicator-item"></span> */}
      </div>
    </button>
    </Link>
  </div>
</div>
    // <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex items-center justify-between w-full">
    //       {/* LOGO - ONLY IN THE CHAT PAGE */}
    //       {/* {isChatPage && ( */}
    //         <div className="pl-1">
              
    //         </div>
    //       {/* )} */}

    //       <div className="flex items-center gap-3 sm:gap-4 ml-auto">
    //         <Link to={"/notifications"}>
    //           <button className="btn btn-ghost btn-circle">
    //             <BellIcon className="h-6 w-6 text-base-content opacity-70" />
    //           </button>
    //         </Link>
    //       </div>

    //       {/* TODO */}
    //       <ThemeSelector />

    //       <div className="avatar">
    //         <div className="w-9 rounded-full">
    //           <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
    //         </div>
    //       </div>

    //       {/* Logout button */}
    //       <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
    //         <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
    //       </button>
    //     </div>
    //   </div>
    // </nav>
  );
};
export default Navbar;
