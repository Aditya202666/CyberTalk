import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { KeyRound, Lightbulb, LogOut, LucideMessageSquareQuote, Moon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const {currentTheme, toggleHover, isHovering, changeTheme} = useThemeStore()
  
  const navigate = useNavigate();

  const [theme, setTheme] = useState(currentTheme === 'dracula')

  const handleThemeChange = ()=>{

    if(theme) changeTheme('synthwave')
    else changeTheme('dracula')
    setTheme(!theme)
  }

  const handleLogout = async () => {
    await logout();
  };

  const handleMouseEnter = () => {
    if (!isHovering) toggleHover(true);
  };
  
  const handleMouseLeave = () => {
    if (isHovering) toggleHover(false);
  };

  return (
    <div className=" w-full flex items-center justify-center px-4 lg:px-8 m-1 bg-base-100 border-b border-base-300 rounded-xl  shadow-lg shadow-accent hover:shadow-secondary "
    onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
    >
      <div className=" max-w-screen-2xl w-full flex justify-between items-center">

      <div v className=" flex align-middle gap-2 cursor-pointer group">
        <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20  transition-colors">
          <LucideMessageSquareQuote className="size-5 text-accent animate-bounce group-hover:text-secondary" />
        </div>{" "}
        <h1 className="hidden sm:block font-semibold text-2xl group-hover:text-secondary  text-accent pt-0.5">
        CyberTalk
        </h1>
      </div>
      <div className="gap-2">
        <div className="dropdown flex gap-2 items-center dropdown-end">
          <div className="text-accent text-xl font-semibold">{authUser.userName}</div>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full shadow-md hover:shadow-secondary shadow-accent ">
              <img className="size-6 rounded-full p-1  border-2 border-accent hover:border-secondary" alt="profile image " src={authUser.avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-44 w-44  p-2 shadow-inner shadow-secondary`}
          >
            <li>
              <a className="hover:text-accent" onClick={()=> navigate('/profile')}>
                <User className="size-4" />
                Profile
              </a>
            </li>
            <li>
              <a className="hover:text-accent" onClick={()=> navigate('/changePassword')}>
                <KeyRound className="size-4" />
                Change Password
              </a>
            </li>
            <li>
              
              <a className="hover:text-accent" onClick={handleThemeChange}> 
              {theme ? <> <Moon className="size-4" />
                <span>Dark</span>  </> :
                 <> <Lightbulb className="size-4" />
                <span>Light</span>  </>}
                </a>
            </li>
            <li>
              
              <a className="hover:text-accent" onClick={handleLogout}>
              <LogOut className="size-4" />
                Logout</a>
            </li>
          </ul>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Navbar;
