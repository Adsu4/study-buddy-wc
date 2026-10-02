# 📡 Study Buddy — Wireless Communication (PCCPT502)

> A modern, distraction-free study companion and university exam preparation platform designed specifically for **Semester S5: Introduction to Wireless Communication (Course Code: PCCPT502)**.

Built strictly according to university syllabus standards and referenced from canonical textbooks:
1. **Theodore S. Rappaport** — *Wireless Communications: Principles and Practice* (2nd Ed)
2. **William C.Y. Lee** — *Wireless Communication Systems* (4th Ed)
3. **William Stallings** — *Wireless Communications and Networks* (2nd Ed)

---

## ✨ Key Features

### 1. Dual-Track Learning System
* **📖 Textbook-Style Rigor:** Comprehensive, structured, and mathematical breakdowns with inline KaTeX formulas, formal derivations, standard parameter tables, and engineering diagrams.
* **🎓 Classroom Lecture Summaries:** Intuitive, teacher-style explanations with real-world analogies (e.g., explaining WEP/WPA/WPA2/WPA3 as locks and vaults, cellular reuse as frequency conservation).
* **⚡ High-Yield Revision:** Crisp, bulleted point-by-point summaries for rapid last-minute recall before tests.

### 2. Interactive Engineering Simulators
No meaningless widgets — each interactable is grounded in core syllabus calculations:
* **Cellular Cluster & Co-Channel Reuse Simulator ($N=i^2+jk+j^2$):** Interactive $i$ and $j$ shifts, cluster size calculation ($N \in \{3, 4, 7, 12\}$), co-channel reuse distance $D/R = \sqrt{3N}$, and worst-case $S/I$ in dB with omni vs. $120^\circ$ directional sectoring.
* **Erlang-B Traffic & GoS Calculator:** Interactive Erlang capacity simulator solving the iterative Erlang-B blocking formula $B(C, A)$ for given trunked channels and carried traffic.
* **Path Loss & Fading Comparator:** Real-time log-distance path loss, Free-space Friis formula, and Okumura-Hata propagation curves across varying carrier frequencies ($900\text{ MHz}$ vs. $1800\text{ MHz}$) and environments (Urban, Suburban, Open Rural).
* **GSM Call Flow & Signal Signaling Sequence:** Step-by-step interactive visualizer tracing RACH, AGCH, SDCCH, FACCH, TCH, and AUC challenge-response authentication.
* **Multiple Access Matrix Comparison:** Interactive side-by-side comparison of FDMA, TDMA, CDMA, OFDM, and CSMA/CA across orthogonal dimensions (Frequency, Time, Code, Space).

### 3. Exam Corner (University Pattern)
* Dedicated revision corner with **Part A (3 Marks)** short-answer questions and **Part B (9 Marks)** comprehensive analytical questions with step-by-step model answers, CO mapping, and marking breakdowns.

### 4. Distraction-Free UI & Productivity Tools
* **Design Aesthetic:** ChatGPT-inspired clean, distraction-free reading typography combined with smooth Claude-style transitions and subtle Gemini gradient accents.
* **Theme Support:** Polished Dark and Light mode toggle with persistent state.
* **Interactive Text Highlighter:** Select any text to highlight in 4 curated colors (Yellow, Cyan, Emerald, Purple), with a slide-out drawer to review, jump to, and export saved highlights.
* **Syllabus & Scheme Modal:** Quick-access modal displaying course outcomes (CO1–CO5), contact hours, credit distribution, and textbook references.

---

## 📚 Complete Syllabus Coverage

| Module | Topic Coverage | Standard Reference |
| :--- | :--- | :--- |
| **Module 1: Introduction to Wireless Systems** | 1G to 5G Evolution, Wireless Systems (Paging, Cordless, Cellular), Simplex/Duplex (FDD vs. TDD), WLL, WLAN, Bluetooth (Piconet/Scatternet), PAN, Wi-Fi, WiMAX, ZigBee | Rappaport Ch. 1 & 2; Stallings Ch. 10 & 15 |
| **Module 2: Cellular Concept & Design** | Hexagonal Geometry, Frequency Reuse ($N=i^2+jk+j^2$), Co-channel Interference ($Q=\sqrt{3N}$, $S/I$), Adjacent Channel Interference, Handoff Strategies (Hard, Soft, MAHO, Umbrella Cell), Trunking & Erlang-B Grade of Service (GoS), Cell Splitting, Sectoring ($120^\circ$ & $60^\circ$), Repeaters, Microcells | Rappaport Ch. 3; Lee Ch. 2 & 6 |
| **Module 3: Propagation Models & Diversity** | Free-space Friis equation, Reflection (Snell's Law, Fresnel coefficients, Brewster angle), Ground Two-Ray Reflection Model, Knife-Edge Diffraction ($v$, Fresnel-Kirchhoff parameter), Scattering (Radar cross section), Link Budget, Okumura & Hata Models, Small-Scale Multipath Fading, Delay Spread, Coherence Bandwidth, Doppler Spread, Coherence Time, Rayleigh & Rician Distributions, Diversity (Space, Frequency, Time, Polarization; Selection, Feedback, Maximal Ratio, Equal Gain Combining) | Rappaport Ch. 4, 5, 7 |
| **Module 4: Multiple Access & Standards** | FDMA, TDMA, CDMA (Near-Far problem, Orthogonal codes), OFDM, CSMA/CA (IEEE 802.11 DCF, RTS/CTS, SIFS/DIFS/EIFS, NAV), GSM Architecture (MS, BSS, NSS, OSS, VLR, HLR, EIR, AUC), GSM Radio Interface & Burst Formats, GSM Speech Processing (RPE-LTP, Class 1a/1b/2, Interleaving), GSM Security (A3, A5, A8, RAND/SRES/$K_c$), GPRS Architecture (SGSN, GGSN, Gb/Gn/Gi interfaces), Wi-Fi Security (WEP, WPA-TKIP, WPA2-AES-CCMP, WPA3-SAE Dragonfly, OWE) | Rappaport Ch. 9 & 10; Stallings Ch. 12, 13, 14 |

---

## 🛠️ Technology Stack

* **Framework:** React 19 + Vite 8
* **Math Rendering:** KaTeX (LaTeX mathematical notation)
* **Icons:** Lucide React
* **Styling:** Modular Vanilla CSS with CSS custom properties (light & dark theme tokens)
* **Linting:** Oxlint

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/Adsu4/study-buddy-wc.git

# Navigate into project directory
cd study-buddy-wc

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License
MIT License. Created for academic and educational learning.
