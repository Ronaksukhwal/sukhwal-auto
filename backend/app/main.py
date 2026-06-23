from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import logging

from .database import engine, get_db
from . import models, schemas

# Initialize database tables
models.Base.metadata.create_all(bind=engine)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Custom .env loader to support runtime configuration
def load_dotenv():
    # Try multiple levels up to find the workspace root .env file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dotenv_candidates = [
        os.path.join(current_dir, "..", "..", ".env"),
        os.path.join(current_dir, "..", ".env"),
        os.path.join(current_dir, ".env"),
        ".env",
    ]
    for path in dotenv_candidates:
        abs_path = os.path.abspath(path)
        if os.path.exists(abs_path):
            try:
                with open(abs_path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#") or "=" not in line:
                            continue
                        k, v = line.split("=", 1)
                        os.environ[k.strip()] = v.strip().strip('"').strip("'")
                logger.info(f"Loaded SMTP configuration from: {abs_path}")
                return abs_path
            except Exception as e:
                pass
    return None

# Load SMTP configurations from .env on startup
load_dotenv()

# SMTP Configurations from environment variables with fallbacks
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
SMTP_FROM = os.environ.get("SMTP_FROM", "") or SMTP_USER

ADMIN_EMAIL = "ronaksukhwal5@gmail.com"

def send_raw_email(to_email: str, subject: str, html_content: str, reply_to: str = None):
    # Reload dotenv dynamically in case the user edited the file while the server is running
    load_dotenv()
    
    host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    try:
        port = int(os.environ.get("SMTP_PORT", "587"))
    except ValueError:
        port = 587
    user = os.environ.get("SMTP_USER", "")
    password = os.environ.get("SMTP_PASSWORD", "")
    sender = os.environ.get("SMTP_FROM", "") or user
    
    if not user or not password or "your_gmail_app_password_here" in password:
        logger.warning(
            f"[EMAIL MOCK] SMTP credentials not fully configured (USER={user}, PASSWORD_SET={bool(password)}). "
            f"Skipping actual email send to {to_email}. Please configure SMTP_USER and SMTP_PASSWORD in your .env file at the project root. "
            f"Logging email content preview:\nSubject: {subject}\nHTML preview: {html_content[:200]}..."
        )
        return False
        
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = sender
        msg['To'] = to_email
        if reply_to:
            msg['Reply-To'] = reply_to
        msg.attach(MIMEText(html_content, 'html'))
        
        # Use SSL for port 465, STARTTLS for others
        if port == 465:
            server = smtplib.SMTP_SSL(host, port, timeout=10)
        else:
            server = smtplib.SMTP(host, port, timeout=10)
            server.starttls()
            
        server.login(user, password)
        server.sendmail(sender, [to_email], msg.as_string())
        server.quit()
        logger.info(f"Successfully sent email to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email} due to error: {str(e)}")
        return False

app = FastAPI(
    title="Sukhwal Auto Services API",
    description="Backend API for bike service bookings specializing in Hero Honda / Hero company bikes.",
    version="1.0.0"
)

# Configure CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all. In production, restrict to specific origin.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hero Honda & Hero MotoCorp Bikes Catalog
HERO_BIKES_CATALOG = {
    "Legacy Classics (Hero Honda Era)": [
        {"id": "cd100", "name": "Hero Honda CD 100", "year": "1985 - 2004", "engine": "97.2 cc", "power": "7.5 bhp"},
        {"id": "sle1994", "name": "Hero Honda Splendor (Original)", "year": "1994 - 2004", "engine": "97.2 cc", "power": "7.4 bhp"},
        {"id": "cd_dawn", "name": "Hero Honda CD Dawn", "year": "2003 - 2015", "engine": "97.2 cc", "power": "7.7 bhp"},
        {"id": "cd_deluxe", "name": "Hero Honda CD Deluxe", "year": "2005 - 2013", "engine": "97.2 cc", "power": "7.7 bhp"},
        {"id": "passion_plus", "name": "Hero Honda Passion Plus", "year": "2003 - 2010", "engine": "97.2 cc", "power": "7.5 bhp"},
        {"id": "cbz", "name": "Hero Honda CBZ / CBZ Gold", "year": "1999 - 2010", "engine": "156.8 cc", "power": "12.8 bhp"},
        {"id": "hunk", "name": "Hero Honda Hunk", "year": "2007 - 2016", "engine": "149.2 cc", "power": "14.2 bhp"},
        {"id": "karizma_r", "name": "Hero Honda Karizma R", "year": "2003 - 2016", "engine": "223 cc", "power": "17 bhp"},
        {"id": "karizma_zmr", "name": "Hero Honda Karizma ZMR", "year": "2009 - 2019", "engine": "223 cc (Fuel Injected)", "power": "20 bhp"}
    ],
    "Modern Commuters (Hero Era)": [
        {"id": "splendor_plus", "name": "Hero Splendor Plus / XTEC", "year": "2004 - Present", "engine": "97.2 cc", "power": "7.91 bhp"},
        {"id": "passion_pro", "name": "Hero Passion Pro / XTEC", "year": "2010 - Present", "engine": "110 cc", "power": "9 bhp"},
        {"id": "hf_deluxe", "name": "Hero HF Deluxe / HF 100", "year": "2013 - Present", "engine": "97.2 cc", "power": "7.91 bhp"},
        {"id": "glamour", "name": "Hero Glamour / XTEC", "year": "2005 - Present", "engine": "124.7 cc", "power": "10.7 bhp"},
        {"id": "super_splendor", "name": "Hero Super Splendor", "year": "2005 - Present", "engine": "124.7 cc", "power": "10.7 bhp"}
    ],
    "Performance & Offroad": [
        {"id": "xpulse_200", "name": "Hero XPulse 200 4V / 2V", "year": "2019 - Present", "engine": "199.6 cc (Oil Cooled)", "power": "18.9 bhp"},
        {"id": "xpulse_200t", "name": "Hero XPulse 200T", "year": "2019 - Present", "engine": "199.6 cc", "power": "17.8 bhp"},
        {"id": "xtreme_160r", "name": "Hero Xtreme 160R 4V / 2V", "year": "2020 - Present", "engine": "163 cc", "power": "15 bhp"},
        {"id": "xtreme_125r", "name": "Hero Xtreme 125R", "year": "2024 - Present", "engine": "124.7 cc", "power": "11.4 bhp"},
        {"id": "karizma_xmr", "name": "Hero Karizma XMR", "year": "2023 - Present", "engine": "210 cc (Liquid Cooled)", "power": "25.15 bhp"}
    ],
    "Scooters": [
        {"id": "pleasure", "name": "Hero Pleasure Plus", "year": "2005 - Present", "engine": "110.9 cc", "power": "8 bhp"},
        {"id": "maestro", "name": "Hero Maestro Edge 125", "year": "2012 - Present", "engine": "124.6 cc", "power": "9 bhp"},
        {"id": "destini", "name": "Hero Destini 125", "year": "2018 - Present", "engine": "124.6 cc", "power": "9 bhp"},
        {"id": "zoom", "name": "Hero Zoom 110", "year": "2023 - Present", "engine": "110.9 cc", "power": "8.05 bhp"}
    ]
}

def send_email_notification(
    booking_id: int,
    customer_name: str,
    customer_phone: str,
    customer_email: str,
    bike_model: str,
    service_type: str,
    booking_date: str,
    booking_time: str,
    needs_pickup: bool,
    pickup_address: str,
    drop_address: str,
    special_instructions: str
):
    # 1. Build Admin HTML Email
    admin_subject = f"[New Booking Alert] Sukhwal Auto - Booking #{booking_id}"
    admin_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #1a1315; background-color: #fffdf5; padding: 20px;">
        <h2 style="color: #31050b; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">New Service Booking #{booking_id}</h2>
        <p>A new bike service booking has been created on the portal. Details below:</p>
        <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2; width: 180px;">Customer Name</td><td style="padding: 8px; border: 1px solid #e91e63;">{customer_name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Phone Number</td><td style="padding: 8px; border: 1px solid #e91e63;">{customer_phone}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Email Address</td><td style="padding: 8px; border: 1px solid #e91e63;">{customer_email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Bike Model</td><td style="padding: 8px; border: 1px solid #e91e63;">{bike_model}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Service Type</td><td style="padding: 8px; border: 1px solid #e91e63;">{service_type}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Date & Time</td><td style="padding: 8px; border: 1px solid #e91e63;">{booking_date} at {booking_time}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Pickup Requested?</td><td style="padding: 8px; border: 1px solid #e91e63;">{"Yes" if needs_pickup else "No"}</td></tr>
          {"<tr><td style='padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;'>Pickup Address</td><td style='padding: 8px; border: 1px solid #e91e63;'>" + pickup_address + "</td></tr>" if needs_pickup else ""}
          {"<tr><td style='padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;'>Drop Address</td><td style='padding: 8px; border: 1px solid #e91e63;'>" + drop_address + "</td></tr>" if needs_pickup else ""}
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Special Instructions</td><td style="padding: 8px; border: 1px solid #e91e63;">{special_instructions if special_instructions else "None"}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 0.85rem; color: #4e4548;">Sukhwal Auto Services Admin Notification</p>
      </body>
    </html>
    """

    # 2. Build Customer HTML Email (Beautiful, Premium confirmation mail)
    customer_subject = f"Booking Confirmation - Sukhwal Auto Services"
    customer_body = f"""
    <html>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                
                <!-- Header Banner -->
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 40px 30px; text-align: center;">
                    <!-- Small Badge -->
                    <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px;">
                      Booking Confirmed
                    </span>
                    <!-- Logo / Brand Name -->
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-transform: uppercase; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      SUKHWAL AUTO SERVICES
                    </h1>
                    <!-- Sub-heading -->
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #ffe4e6; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
                      Hero MotoCorp &amp; Hero Honda Specialists
                    </p>
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <!-- Greeting -->
                    <h2 style="margin-top: 0; margin-bottom: 12px; font-size: 20px; font-weight: 700; color: #0f172a;">
                      Hello {customer_name},
                    </h2>
                    
                    <!-- Confirmation Message Container -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #fff1f2; border-left: 4px solid #e11d48; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 600; color: #9f1239;">
                            Sukhwal Auto Services confirms your service booking and our team will contact you shortly to coordinate further details.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #475569;">
                      Thank you for choosing us for your bike service. Below are the details of your appointment:
                    </p>

                    <!-- Booking Details Table -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 30px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; overflow: hidden;">
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b; width: 160px;">Booking Ref</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">#SAS-{booking_id}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b;">Bike Model</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">{bike_model}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b;">Service Type</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">{service_type}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b;">Appointment Date</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">{booking_date}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b;">Appointment Time</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">{booking_time}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; font-size: 14px; font-weight: 600; color: #64748b;">Service Mode</td>
                        <td style="padding: 14px 20px; font-size: 14px; font-weight: 700; color: #0f172a;">{"Doorstep Pickup & Drop" if needs_pickup else "Self Drop-off at Workshop"}</td>
                      </tr>
                    </table>

                    <!-- Genuine Parts Guarantee Badge -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                      <tr>
                        <td style="background-color: #f8fafc; padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                          <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                            🛡️ 100% Genuine Spares Guarantee
                          </h4>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px; background-color: #ffffff;">
                          <p style="margin: 0; font-size: 13.5px; line-height: 20px; color: #475569;">
                            We strictly use <strong>Hero MotoCorp Genuine Spares</strong>. Each part has a verifiable security hologram. Our master mechanic, <strong>Mr. Gopal Sukhwal</strong> (40+ years of experience), personally supervises every service to guarantee peak performance and authenticity.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Location and directions -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #fafafa; border: 1px solid #f1f5f9; border-radius: 12px; padding: 20px;">
                      <tr>
                        <td>
                          <h4 style="margin-top: 0; margin-bottom: 8px; font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                            📍 Workshop Location
                          </h4>
                          <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #475569;">
                            Shop no. 2, near TB Hospital, Manikya Nagar, Bhilwara (311001)
                          </p>
                          <!-- Call-to-action button -->
                          <a href="https://maps.app.goo.gl/fMkj48yBKgKGPyNy9" target="_blank" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                            Open in Google Maps &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Sign off -->
                    <p style="margin: 0; font-size: 15px; line-height: 24px; color: #475569;">
                      Best Regards,<br>
                      <strong>Gopal Sukhwal &amp; Team</strong><br>
                      Sukhwal Auto Services, Bhilwara
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f1f5f9; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">
                      Need immediate help? Call us: <a href="tel:+919414288990" style="color: #e11d48; text-decoration: none; font-weight: 700;">+91 94142 88990</a>
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                      &copy; 2000 - 2026 Sukhwal Auto Services. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """
    # Send both emails
    send_raw_email(ADMIN_EMAIL, admin_subject, admin_body)
    send_raw_email(customer_email, customer_subject, customer_body)


def send_contact_email_notification(
    name: str,
    email: str,
    message: str
):
    # 1. Build Admin HTML Email (with Reply-To header pointing to user's email)
    admin_subject = f"[Contact Form Inquiry] From {name}"
    admin_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #1a1315; background-color: #fffdf5; padding: 20px;">
        <h2 style="color: #31050b; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">New Contact Inquiry</h2>
        <p>A user has submitted a contact form message. Click "Reply" in your mail client to reply directly to them.</p>
        <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2; width: 150px;">Name</td><td style="padding: 8px; border: 1px solid #e91e63;">{name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Email</td><td style="padding: 8px; border: 1px solid #e91e63;">{email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Message</td><td style="padding: 8px; border: 1px solid #e91e63; white-space: pre-wrap;">{message}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 0.85rem; color: #4e4548;">Sukhwal Auto Services Admin Notification</p>
      </body>
    </html>
    """

    # 2. Build Customer HTML Email (Beautiful Confirmation Auto-Reply)
    customer_subject = f"We received your message - Sukhwal Auto Services"
    customer_body = f"""
    <html>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                
                <!-- Header Banner -->
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 40px 30px; text-align: center;">
                    <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px;">
                      Inquiry Received
                    </span>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-transform: uppercase; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      SUKHWAL AUTO SERVICES
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #ffe4e6; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
                      Hero MotoCorp &amp; Hero Honda Specialists
                    </p>
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin-top: 0; margin-bottom: 12px; font-size: 20px; font-weight: 700; color: #0f172a;">
                      Hello {name},
                    </h2>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #fff1f2; border-left: 4px solid #e11d48; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0; font-size: 15px; line-height: 24px; color: #334155; font-style: italic;">
                            Thank you for contacting us. We have successfully received your message and will review it. Mr. Gopal Sukhwal or a team representative will get back to you shortly.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #475569;">
                      Here is a copy of your message details for your records:
                    </p>

                    <!-- Message Detail Table -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 30px; background-color: #fafafa; border-radius: 8px; border: 1px solid #f1f5f9; overflow: hidden;">
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; font-weight: 600; color: #64748b; width: 120px;">Sender Name</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; color: #0f172a;">{name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; font-weight: 600; color: #64748b;">Your Email</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; color: #0f172a;">{email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13.5px; font-weight: 600; color: #64748b; vertical-align: top;">Message</td>
                        <td style="padding: 12px 16px; font-size: 13.5px; color: #0f172a; white-space: pre-wrap; line-height: 1.5;">{message}</td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 30px 0; font-size: 14px; line-height: 22px; color: #475569;">
                      For urgent inquiries, parts availability checks, or roadside assistance in Bhilwara, please call our workshop hotline directly.
                    </p>

                    <!-- Sign off -->
                    <p style="margin: 0; font-size: 15px; line-height: 24px; color: #475569;">
                      Best Regards,<br>
                      <strong>Gopal Sukhwal &amp; Team</strong><br>
                      Sukhwal Auto Services, Bhilwara
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f1f5f9; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">
                      Hotline: <a href="tel:+919414288990" style="color: #e11d48; text-decoration: none; font-weight: 700;">+91 94142 88990</a>
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                      Shop no. 2, near TB Hospital, Manikya Nagar, Bhilwara (311001)
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """
    
    # Send admin notification (with Reply-To set to user's email)
    send_raw_email(ADMIN_EMAIL, admin_subject, admin_body, reply_to=email)
    # Send confirmation auto-reply to user
    send_raw_email(email, customer_subject, customer_body)


@app.get("/", tags=["Health"])
def read_root():
    return {
        "status": "online",
        "message": "Welcome to Sukhwal Auto Services API. Specializing in Hero Honda and Hero MotoCorp bike repairs.",
        "brand_specialty": "Hero Honda & Hero MotoCorp",
        "parts_policy": "100% Genuine Hero MotoCorp Parts Only"
    }

@app.get("/api/bikes", response_model=Dict[str, List[Dict[str, str]]], tags=["Catalog"])
def get_bikes_catalog():
    """Returns the organized directory of all Hero & Hero Honda bikes supported by the workshop."""
    return HERO_BIKES_CATALOG

@app.post("/api/bookings", response_model=schemas.BookingResponse, status_code=status.HTTP_201_CREATED, tags=["Bookings"])
def create_booking(booking: schemas.BookingCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Creates a new service booking. Includes validation for pickup & drop options and triggers background email notifications."""
    # Custom validation: if pickup is requested, address must be provided
    if booking.needs_pickup:
        if not booking.pickup_address or not booking.pickup_address.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Pickup address is required when Bike Pickup & Drop is requested."
            )
        if not booking.drop_address or not booking.drop_address.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Drop-off address is required when Bike Pickup & Drop is requested."
            )

    db_booking = models.Booking(
        customer_name=booking.customer_name,
        customer_phone=booking.customer_phone,
        customer_email=booking.customer_email,
        bike_model=booking.bike_model,
        service_type=booking.service_type,
        booking_date=booking.booking_date,
        booking_time=booking.booking_time,
        needs_pickup=booking.needs_pickup,
        pickup_address=booking.pickup_address,
        drop_address=booking.drop_address,
        special_instructions=booking.special_instructions,
        status="Pending"
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    # Trigger background email delivery for Admin notification & Customer confirmation
    background_tasks.add_task(
        send_email_notification,
        booking_id=db_booking.id,
        customer_name=db_booking.customer_name,
        customer_phone=db_booking.customer_phone,
        customer_email=db_booking.customer_email,
        bike_model=db_booking.bike_model,
        service_type=db_booking.service_type,
        booking_date=db_booking.booking_date,
        booking_time=db_booking.booking_time,
        needs_pickup=db_booking.needs_pickup,
        pickup_address=db_booking.pickup_address or "None",
        drop_address=db_booking.drop_address or "None",
        special_instructions=db_booking.special_instructions or "None"
    )
    
    return db_booking

@app.get("/api/bookings", response_model=List[schemas.BookingResponse], tags=["Bookings"])
def list_bookings(db: Session = Depends(get_db)):
    """Retrieve all bookings in reverse chronological order."""
    return db.query(models.Booking).order_by(models.Booking.id.desc()).all()


@app.post("/api/contact", response_model=schemas.ContactMessageResponse, status_code=status.HTTP_201_CREATED, tags=["Contact"])
def create_contact_message(msg: schemas.ContactMessageCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Saves a contact inquiry and dispatches background email notifications to admin and user."""
    db_msg = models.ContactMessage(
        name=msg.name,
        email=msg.email,
        message=msg.message
    )
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    
    # Trigger background email delivery for Admin notification & Customer auto-reply
    background_tasks.add_task(
        send_contact_email_notification,
        name=db_msg.name,
        email=db_msg.email,
        message=db_msg.message
    )
    
    return db_msg


@app.get("/api/contact", response_model=List[schemas.ContactMessageResponse], tags=["Contact"])
def list_contact_messages(db: Session = Depends(get_db)):
    """Retrieve all contact inquiries in reverse chronological order."""
    return db.query(models.ContactMessage).order_by(models.ContactMessage.id.desc()).all()

