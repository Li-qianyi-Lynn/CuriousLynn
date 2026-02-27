## CuriousLynn

CuriousLynn is a personal, curiosity-driven portfolio site that showcases Lynn's work at the intersection of **Human–Computer Interaction**, **AI**, **frontend design**, and **systems / tooling**.  
It is designed as a playful space where empathy (psychology) and logic (computer science) meet.

### Features

- **Dual view modes** – Toggle between *Empathy* and *Logic* modes to see different visual themes and microcopy.
- **Core Focus grid** – Three main categories (AI + HCI, Frontend Design, Good Tools) that surface representative GitHub projects.
- **Immersive project overlays** – Full-screen, narrative-style detail views for each category, with extended project stories.
- **Interactive "Leave a Paw" section** – A small guestbook / feedback experience powered by Firebase.
- **Floating assistant & curiosity meter** – Fun UI elements that respond to scroll and exploration progress.

### Tech Stack

- **Frontend**: React, JSX, Tailwind CSS-style utility classes
- **Icons**: `lucide-react`
- **Data**: Local project metadata in `src/data/projects.js`
- **Backend / Realtime**: Firebase (Auth + Firestore) for the paw-print guestbook

### Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up Firebase**

   - Create a Firebase project.
   - Enable Authentication (Anonymous or custom token) and Firestore.
   - Provide the Firebase config.
    
    VITE_FIREBASE_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET
    VITE_FIREBASE_MESSAGING_SENDER_ID
    VITE_FIREBASE_APP_ID
    VITE_FIREBASE_MEASUREMENT_ID

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open the URL printed in your terminal (often `http://localhost:5173` or similar, depending on your tooling).

### Project Structure (high level)

- `src/App.jsx` – Main SPA entry for the portfolio version.
- `src/data/projects.js` – Project categories and GitHub links.
- `src/components/` – Layout, project grid, immersive overlays, UI chrome (curiosity meter, floating assistant, etc.).
- `frame.jsx` – An alternative single-file frame that wires in Firebase and reproduces the core experience.

### Customization Ideas

- Tweak copy, categories, and project lists in `src/data/projects.js`.
- Adjust animations, colors, and layout in the components under `src/components/`.
- Swap Firebase for another backend if you want a different persistence layer for messages.

### License

This project is currently shared for learning and portfolio purposes.  
If you would like to use or adapt it, please reach out to Lynn first.