import sys
import os

# Add the backend directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, engine, Base
from app.models import Booking

# Create tables
Base.metadata.create_all(bind=engine)

def test_booking_creation():
    db = SessionLocal()
    try:
        # Clear existing test bookings if any
        db.query(Booking).filter(Booking.customer_email == "test@sukhwal.com").delete()
        db.commit()

        # Create new booking
        new_booking = Booking(
            customer_name="Test User",
            customer_phone="9876543210",
            customer_email="test@sukhwal.com",
            bike_model="Hero Splendor Plus",
            service_type="Full General Service",
            booking_date="2026-06-20",
            booking_time="10:00 AM",
            needs_pickup=True,
            pickup_address="123 Test Street, Udaipur",
            drop_address="123 Test Street, Udaipur",
            special_instructions="Check front disc brake noise.",
            status="Pending"
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)

        # Retrieve and verify
        retrieved = db.query(Booking).filter(Booking.customer_email == "test@sukhwal.com").first()
        assert retrieved is not None, "Failed to retrieve booking"
        assert retrieved.customer_name == "Test User"
        assert retrieved.bike_model == "Hero Splendor Plus"
        assert retrieved.needs_pickup is True
        print("SUCCESS: Database models and booking records verified successfully!")
        
        # Clean up
        db.delete(retrieved)
        db.commit()
    except Exception as e:
        print(f"FAILED: Database verification error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    test_booking_creation()
