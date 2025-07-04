import React from "react";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import assets from "../assets/assets";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  //add the images from messages to msgImages
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-[#818582]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}
      >
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx:auto">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt="ProfilePic"
            className="w-20 aspect-[1/1] rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {onlineUsers.includes(selectedUser._id) ? (
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
            ) : (
              <p className="w-2 h-2 rounded-full bg-red-500"></p>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto">{selectedUser.bio}</p>
        </div>
        <hr className="border-[#ffffff50] my-4" />
        <div className="px-5 text-xs font-light">
          <p>Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url, "_blank")}
                className="cursor-pointer rounded"
              >
                <img src={url} alt="" className="w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={logout}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-blue-500 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer"
        >
          LogOut
        </button>
      </div>
    )
  );
};

export default RightSidebar;
