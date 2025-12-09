import React, { useEffect, useState, useRef } from "react";
import { Users, LogOut, Copy } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface User {
  id: string;
  name: string | null;
}

interface WSMessage {
  type: string;
  users?: User[];
  name?: string;
}

const PlaygroundHeader = () => {

   const { roomId } = useParams<{ roomId: string }>();

  const [users, setUsers] = useState<User[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const username =
    (typeof window !== "undefined" &&
      localStorage.getItem("username")) ||
    "Unknown";

   const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8000";
    //const WS_URL ="wss://pairprogramming-4ptc.onrender.com";

  
  useEffect(() => {
    if (!roomId) return;

    // ws.current = new WebSocket(`ws://localhost:8000/room/${roomId}`);
     ws.current = new WebSocket(`${WS_URL}/ws/${roomId}`);

    ws.current.onopen = () => {
      const joinMsg: WSMessage = {
        type: "join",
        name: username,
      };
      ws.current?.send(JSON.stringify(joinMsg));
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const data: WSMessage = JSON.parse(event.data);

        if (data.type === "users" && data.users) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Invalid WS message:", err);
      }
    };

    return () => {
  try {
    const socket = ws.current;
    if (!socket) return;

    // Only send leave message if WebSocket is OPEN
    if (socket.readyState === WebSocket.OPEN) {
      const leaveMsg: WSMessage = {
        type: "leave",
        name: username,
      };
      socket.send(JSON.stringify(leaveMsg));
    }

    // Close only if connecting or open
    if (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    ) {
      socket.close();
    }
  } catch (err) {
    console.warn("WebSocket cleanup error:", err);
  }
};
  }, [roomId, username]);
  return (
    <>

      <div className="flex flex-col gap-[18px] py-[16px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
        <div className="flex flex-row justify-between mx-[18px]">
          <div className="text-[18px] font-[600]">Room : {roomId}</div>

          <div
            className="flex gap-[6px] p-[10px] border border-white/30 rounded-[12px] cursor-pointer"
            onClick={() => roomId && navigator.clipboard.writeText(roomId)}
          >
            <Copy />
            <p>Copy ID</p>
          </div>
        </div>

        <div className="mx-[18px]">
          {/* <div className="flex gap-[6px] p-[10px] border border-white/30 rounded-[12px] cursor-pointer">
            <Users />
            <p>{users.length} Online</p>
             {/* Avatars */}
          <div className="flex gap-2 ml-3">
            {users.map((u) => (
              <div
                key={u.id}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white font-semibold"
              >
                {u.name ? u.name.charAt(0).toUpperCase() : "U"}
              </div>
            ))}
          </div>
          {/* </div> */} 

          <Link to="/" className="min-w-[120px] max-w-[200px] flex gap-[10px] p-[10px] border border-white/30 rounded-[12px] cursor-pointer">
            <LogOut />
            <p>Leave</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default PlaygroundHeader