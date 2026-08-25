# National Cyber Crime Reporting Portal (NCRP) – Redesign

> **Core Philosophy:** *AI assists. The citizen confirms. Authorities decide.*

A modern, citizen-first reimagining of India's National Cybercrime Reporting Portal (NCRP) under the Indian Cybercrime Coordination Centre (I4C) and Ministry of Home Affairs (MHA). Built for speed, psychological safety, and rapid institutional response during high-stress cyber incidents.

---

## 🚀 Key Features

* **Zero-Confusion Emergency Triage:** Immediate branching into critical incident categories (Financial Fraud, Cyber Harassment, Hacking) with prioritized 1930 helpline routing and golden-hour transaction freezing support.
* **AI-Assisted Multimodal Evidence Extraction:** Real-time extraction of transaction IDs, timestamps, beneficiary UPI IDs, and fraudulent phone numbers from uploaded screenshots and bank statements using Gemini 3.6 Flash.
* **Voice & Multilingual Dictation:** Native speech-to-text and Indian language translation powered by Web Speech API with Bhashini ULCA architecture compatibility.
* **Check & Verify Registry:** Fact-based verification tool for citizen verification of suspicious UPI handles, phone numbers, and URLs without subjective risk scoring.
* **Transparent Case Tracking:** End-to-end milestone tracker providing clear status updates, jurisdictional nodal officer assignments, and actionable next steps.
* **Institutional Governance & Accessibility:** Strict compliance with GIGW 2.0 and WCAG 2.1 Level AA standards, featuring dynamic font scaling (`A-`, `A`, `A+`) and fully keyboard-navigable policy dialogs.
* **1-Click Judge Demo Scenarios:** Built-in demo persona switcher and pre-seeded mock scenarios allowing instant evaluation across all reporting flows.

---

## 🛠️ Tech Stack

* **Framework:** React 18 with TypeScript & Vite
* **Styling:** Tailwind CSS, PostCSS
* **Icons & UI:** Lucide React
* **AI & Intelligence:** Google Gemini API (`gemini-3.6-flash`), Web Speech API
* **Deployment:** Static SPA (Vite build)

---

## 📁 Project Structure

```text
├── public/                # Static assets, national emblem, favicons
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication & demo persona components
│   │   ├── cards/         # Incident category and feature cards
│   │   ├── common/        # Header, Footer, Policy Modals, Auto-fill demo buttons
│   │   └── home/          # Hero banner, 1930 alert box, quick action items
│   ├── context/           # Global demo state, language, & active complaint context
│   ├── data/              # Mock pre-seeded incident logs, nodal officer directory
│   ├── pages/             # Route views (Report, Track, Verify, Help, Policies)
│   ├── services/          # Gemini AI multimodal extraction & translation services
│   └── types/             # TypeScript schema definitions
├── .env.example           # Environment variable template
├── tailwind.config.js     # Institutional color palette & typography
└── vite.config.ts         # Vite bundler configuration
