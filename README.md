# Sukhwal Auto Services - Web Platform

A premium, highly animated website and booking platform for **Sukhwal Auto Services** in Udaipur. This workshop specializes exclusively in repairing **Hero Honda** and **Hero MotoCorp** motorcycles, using only 100% genuine spares.

---

## 🚀 Quick Start (Single Command)

We have created a development helper script that starts both the backend API and frontend Vite servers in parallel, handling routing and shutdown automatically:

```bash
python run_dev.py
```

After running the script, open:
- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API Docs (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ Technology Stack

1. **Frontend:** React.js (Vite)
   - **Styling:** Custom CSS variables, glassmorphic panels, and SVG gooey filters.
   - **3D Animation:** Three.js, React Three Fiber (`@react-three/fiber`), and `@react-three/drei`.
   - **Transitions:** Framer Motion (page animations, sliding panels, and modal flows).
   - **Icons:** Lucide React.
2. **Backend:** FastAPI (Python)
   - **Framework:** FastAPI (high-speed, asynchronous, auto-generated OpenAPI docs).
   - **ORM:** SQLAlchemy for SQLite interaction.
   - **Validation:** Pydantic schemas.
3. **Database:** SQLite (`backend/bookings.db`)
   - Persistent relational storage for client details, bike models, pickup/drop addresses, and booking slots.

---

## 📂 Project Structure

```
Sukhwal Auto/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI entry point & supported Hero bikes list
│   │   ├── database.py        # SQLite setup and session generator
│   │   ├── models.py          # SQLAlchemy schema definition (bookings)
│   │   └── schemas.py         # Pydantic validation models
│   ├── requirements.txt       # Backend Python dependencies
│   ├── test_db.py             # Database connectivity validation script
│   └── bookings.db            # SQLite database file (auto-generated)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Static local files
│   │   ├── components/
│   │   │   ├── LiquidButton.jsx      # Custom liquid-goo effect button
│   │   │   └── ThreePartsCanvas.jsx  # Interactive procedural 3D mechanical parts
│   │   ├── screens/
│   │   │   ├── Home.jsx              # Hero banner and workshop stats
│   │   │   ├── Bikes.jsx             # Categorized Hero/Hero Honda model list
│   │   │   ├── GenuineParts.jsx      # 3D canvas and engineering specs panel
│   │   │   ├── Services.jsx          # Custom commuter & performance service packs
│   │   │   ├── BookService.jsx       # Interactive form with pickup/drop toggle
│   │   │   ├── AboutUs.jsx           # Workshop heritage and values
│   │   │   └── ContactUs.jsx         # Operating hours, details & direction map
│   │   ├── App.jsx            # Tab routing and global SVG filter setup
│   │   ├── index.css          # Design tokens, gooey filters, and scrollbars
│   │   └── main.jsx           # React app entry point
│   ├── package.json           # Frontend Node packages
│   └── index.html             # HTML shell with custom SEO metadata
├── run_dev.py                 # Cross-platform parallel process runner
└── README.md                  # Setup & documentation (This file)
```

---

## 🛠️ Manual Execution (Alternative)

If you prefer to start the servers separately:

### 1. Backend Setup & Run
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 2. Frontend Setup & Run
```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Key Technical Features

### 1. Liquid Gooey Hover Button (`LiquidButton.jsx`)
Utilizes a hidden SVG filter inside `App.jsx` which applies a heavy Gaussian Blur combined with an anchored Color Matrix to isolate color alphas:
```xml
<filter id="gooey-filter">
  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
</filter>
```
On hover, circular child blobs expand outward under the text, blending together organically to create a liquid bubble effect.

### 2. Procedural 3D Mechanical Parts exploder (`ThreePartsCanvas.jsx`)
Instead of loading external heavy `.gltf` mesh files (which can cause slow load times or broken paths), the canvas renders custom, high-fidelity mechanical structures built procedurally out of cylinders, toruses, boxes, and springs.
- **Float Control:** Slow, continuous rotation and bounce using Drei's `Float`.
- **Interaction:** OrbitControls support for rotation and zooming. Hovering highlights individual parts in red, and clicking on a part sends its tolerance specifications to the UI sidebar.
- **Assembly Animation:** When the "Assemble Engine" button is clicked, a state changes the target position of all parts to slide along their coordinate paths using a smooth mathematical interpolation (lerp) into a singular stack.

### 3. Smart Pickup & Drop Option
The booking form in `BookService.jsx` contains a toggle switch for the pickup/drop service. Activating it triggers a slide transition revealing two fields for the customer's pickup and drop-off address in Udaipur, which are validated by the backend.
