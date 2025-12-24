# 🚀 Pair Programming – Real-Time Collaborative Code Editor

A real-time collaborative Python code editor built using React + Monaco Editor on the frontend and FastAPI WebSockets on the backend.
Multiple users can join the same room and write/edit Python code together with instant synchronization.

## 🌐 Live Demo
#### Frontend URL : [Frontend Demo](https://frontend-conversational-appointment-cz7mrl05d.vercel.app/)
#### Backend URL  : [Backend Demo](https://backend-conversational-appointment.onrender.com/docs)

## 📸 Walkthrough
🧑‍💻 Home Page — Generate a Room ID
<img width="1919" height="851" alt="image" src="https://github.com/user-attachments/assets/6b4a1e7e-98e3-4bc5-a029-c2497bee90eb" />
<img width="1914" height="835" alt="image" src="https://github.com/user-attachments/assets/475cf95f-52d6-4a04-a2d5-ed9c99061172" />

<img width="1883" height="675" alt="image" src="https://github.com/user-attachments/assets/e7ace078-8114-4be7-b7d4-e6dba18c718e" />
<img width="1895" height="640" alt="image" src="https://github.com/user-attachments/assets/fcfac934-e791-4550-a5a1-e90700bbccf5" />



- Click Generate to create a unique room ID.

- Share this ID with friends or colleagues.

## 🔗 Join the Room

- After generating the room ID, click Join Room.

- Anyone who uses the same room ID will join the same session.


## 🧩 Tech Stack
### Frontend

- React (Vite)

- TypeScript

- React Router

- Monaco Editor

- WebSockets (native API)

- Tailwind CSS (optional depending on UI)

### Backend

- FastAPI

- WebSockets

- Async Room Code Storage (DB or in-memory depending on environment)

- Autocomplete API (Python analysis logic)

## 🔧 How It Works
### 1. Generate or Enter Room ID

- Users can generate a unique ID or join an existing one.

### 2. Connect Through WebSockets

- On /ws/{room_id}, all clients inside the same room stay connected.

### 3. Real-Time Sync

- Every keystroke is broadcast to all users except the sender.

### 4. Auto-Save & History

- The backend updates the stored code for the room instantly.

### 5. AI Autocomplete

- The editor sends code + cursor position to /autocomplete, and the backend returns a suggestion.

### 📌 Features
- ✅ Room Creation & Join

    - Users can generate unique room IDs
    
    - Join rooms via URL (/room/:roomId)
    
    - No authentication required

- ✅ Real-Time Collaborative Editor

    - Two (or more) users edit the same code in real time
    
    - WebSockets for instant updates
    
    - Python-only code editor (custom-built)

- ✅ AI Autocomplete (Mocked)

  - /autocomplete API suggests code completions
  
  - Triggered after 600ms of typing pause
  
  - Rule-based static suggestions (lightweight)

- ✅ Modern Tech Stack

  - Backend: FastAPI, WebSockets
  
  - Frontend: React, TypeScript, Vite
  
  - State Management: Zustand / Redux (depending on your choice)
  
  - Optional DB: PostgreSQL (future enhancement)
 
# 🏗️ Project Structure

## Backend
<img width="346" height="402" alt="image" src="https://github.com/user-attachments/assets/83c37680-e3f5-4c21-959b-1c7878ba21f1" />
## ⚙️ Setup & Installation Backend

### **1. Create & activate virtual environment **
```bash
cd backend/pairBackend
python -m venv venv
venv\Scripts\activate
```

### **2. Install dependencies
```bash
pip install -r requirements.txt
```

### **3. Run FastAPI server
```bash
uvicorn app.main:app --reload
```

### **4.Backend runs at:
```bash
http://127.0.0.1:8000
```

### **5. WebSocket endpoint
```bash
ws://127.0.0.1:8000/ws/{roomId}
```

## Frontend Setup (React + TypeScript + Vite)
<img width="418" height="815" alt="image" src="https://github.com/user-attachments/assets/ec95d997-6cb8-431a-90d0-a32bff46c0c7" />

## ⚙️ Setup & Installation Frontend

### **1. Install dependencie **
```bash
cd frontend/vite-project
npm install
```

### **2. Start development server
```bash
npm run dev
```

### **3. Frontend runs at:
```bash
http://localhost:5173
```
# 🔮 Future Enhancements (What I’d Improve With More Time)

- Real AI autocomplete using OpenAI / Groq

- Cursor tracking & multi-cursor editing

- User presence indicators (show who is typing)

- File system panel (multiple files per room)

- Save room code to PostgreSQL

- Add authentication & private rooms

- Build a fully custom Monaco-based editor

## 👨‍💻 Author

### Gopi Chandu
##### Full-Stack Developer (React + Python + FastAPI)




