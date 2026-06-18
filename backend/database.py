from typing import Optional
from sqlmodel import Field, SQLModel, create_engine

# This class simultaneously defines the SQLite table structure and Pydantic rules
class AIStrategyPayload(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    industry: str = Field(min_length=2)
    ai_investment_usd: float = Field(gt=0.0)
    employee_ai_training_hours: int = Field(ge=0)
    company_website: Optional[str] = Field(default=None)

# SQLite setup configurations
sqlite_file_name = "roi_history.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    create_db_and_tables()