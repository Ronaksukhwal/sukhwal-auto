from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class BookingBase(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=100)
    customer_phone: str = Field(..., min_length=10, max_length=15)
    customer_email: EmailStr
    bike_model: str
    service_type: str
    booking_date: str
    booking_time: str
    needs_pickup: bool = False
    pickup_address: Optional[str] = None
    drop_address: Optional[str] = None
    special_instructions: Optional[str] = None

class BookingCreate(BookingBase):
    pass

class BookingResponse(BookingBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class ContactMessageBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=5, max_length=1000)

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageResponse(ContactMessageBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
