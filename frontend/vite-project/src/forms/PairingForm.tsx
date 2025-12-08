import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PairingForm = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    const res = await fetch("http://localhost:8000/rooms", {
      method: "POST",
    });

    const data = await res.json();

    // Autofill
    setRoomId(data.roomId);
  };

  const joinRoom = () => {
    if (!roomId.trim()) {
      alert("Please enter or generate a room ID");
      return;
    }
    navigate(`/playground/${roomId}`);
  };
  return (
    <>
        <div className='flex flex-col md:w-[50%] w-[100%] px-[24px] md:px-[0px] gap-[12px] my-[24px]'>
            <input placeholder='Your name (Optional)' className='w-full rounded-xl px-[12px] py-[10px] border-[1px] border-[#000]'/>
            <div className='w-full flex gap-[6px]'>
                <input 
                   value={roomId}              
                   onChange={(e) => setRoomId(e.target.value)} 
                   placeholder='Enter room ID' 
                   className='w-[70%] rounded-xl border-[1px] border-[#000] px-[12px] py-[6px]'
                />
                <button onClick={createRoom} className='bg-gradient-to-br from-black to-gray-700 rounded-xl px-[12px] py-[10px] border-[1px] border-[#000] text-[#fff] text-center w-[30%] cursor-pointer'>Generate</button>
            </div>
            <Link to={roomId ? `/playground/${roomId}` : "#"} className='w-full text-center bg-gradient-to-br from-black to-gray-700 rounded-xl px-[12px] py-[10px] border-[1px] border-[#000] text-[#fff] cursor-pointer'>Join Room</Link>
        </div>
    </>
  )
}

export default PairingForm