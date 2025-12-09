# Pair Programming – Real-Time Collaborative Code Editor

## FastAPI + WebSockets + React + TypeScript

A real-time collaborative coding platform where two users can join the same room, write Python code together, and see each other's changes instantly.
Includes mocked AI autocomplete, WebSockets, and clean backend/frontend separation.

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




