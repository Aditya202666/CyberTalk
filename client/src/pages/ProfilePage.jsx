import { ArrowLeft, Camera, Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { changeAvatar, isUpdatingAvatar, isUpdatingUsername, checkIsUserNameTaken, changeUserName } =
    useUserStore();

  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState("");
  const [newAvatar, setNewAvatar] = useState("");

  const handleImageUpload = (e) => {
    const imgFile = e.target.files[0];

    if (!imgFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(imgFile);

    reader.onload = async () => {
      const base64Image = reader.result;

      const res = await changeAvatar({ avatar: base64Image });
      if (res) setNewAvatar(base64Image)

    };
  };

  const handleChangeUsername = () =>{
    changeUserName({newUsername : newUsername});
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkIsUserNameTaken({ userName: newUsername });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [newUsername]);

  return (
    <div className="min-h-screen ">
      <div className="relative max-w-3xl w-full mx-auto p-4 md:pt-4 lg:pt-8 py-0">
        <div
          className="absolute top-4 md:top-8 lg:top-12 left-8 size-12 bg-accent/10 rounded-full flex items-center justify-center group hover:bg-secondary/20 transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="size-7 text-accent group-hover:text-secondary animate-bounce" />
        </div>
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={newAvatar || authUser.avatar}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-accent"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingAvatar, isUpdatingUsername ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-secondary" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingAvatar}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingAvatar
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5 relative">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <input
                className="px-4 py-2.5 w-4/6 bg-base-200 rounded-lg border text-accent"
                value={newUsername || authUser.userName}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button
                className="px-4 py-2 rounded-lg bg-accent ml-4 font-semibold text-base-content hover:scale-105 active:scale-90 transition-all"
                type="button"
                onClick={handleChangeUsername}
                disabled={isUpdatingUsername}
              >
                Save
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 w-[95%] rounded-lg border text-accent">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
