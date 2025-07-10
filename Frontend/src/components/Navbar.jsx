import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, Contact, LogOutIcon, Menu, PaletteIcon, Scroll, UsersIcon, Video } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import NoFriendsFound from "./NoFriendsFound";
import FriendCard from "./FriendCard";

const Navbar = () => {
  const { theme, setTheme } = useThemeStore();
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const isChatPage = location.pathname?.startsWith("/chat");

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

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
    <div className="dropdown z-30">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <Menu className="size-9" />
          </button>
    
          <div
            tabIndex={0}
            className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
            w-56 border border-base-content/10 max-h-80 overflow-y-auto"
          >
            <div className="space-y-1">
                <button
                  key={1}
                  className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors`}
                  onClick={() => null }
                >
                  <div className="ml-auto flex gap-1">
                    {friends.length === 0 ? (
                      <p>No Connection Yet</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 m-4">
                        {friends.map((friend) => (
                          <FriendCard key={friend._id} friend={friend} />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
           
            </div>
          </div>
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
    <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
  </div>
</div>
  );
};
export default Navbar;
