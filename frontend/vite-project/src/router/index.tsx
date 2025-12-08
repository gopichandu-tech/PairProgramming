import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import PlayGround from "@/pages/PlayGround";

export const router = createBrowserRouter(
    [
        {
            path:'/',
            element : <Home />
        },
        {
            path:'/playground/:roomId',
            element : <PlayGround />
        }
    ]
);