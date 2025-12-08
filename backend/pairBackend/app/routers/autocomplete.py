from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/autocomplete", tags=["Autocomplete"])

class AutoRequest(BaseModel):
    code: str
    cursorPosition: int
    language: str

@router.post("")
def autocomplete(req: AutoRequest):
    # Simple mock suggestion
    return {
        "suggestion": "print('Hello from AI autocomplete!')",
    }
