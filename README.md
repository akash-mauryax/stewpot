# Stewpot Communications — Enterprise Web Portal
> **"The Smart Business Network"** • Official Enterprise IT Solutions & Strategic Consulting Web Application

Built directly from the official corporate pitch deck & presentation of **Stewpot Communications**, this modern, high-performance web application elevates Stewpot's brand identity into an enterprise-grade digital experience.

---

## 🌟 Key Features & Slide-by-Slide Transformation

| PDF Page | Original Topic | Web Application Feature & Implementation |
|---|---|---|
| **Cover & Page 1** | Stewpot Communications: Your Trusted Business Consulting Partners | **Hero Command Center**: High-impact gradient typography, trust metrics, dual CTAs, live network hub visual, and infinite scrolling OEM marquee. |
| **Page 2** | About Stewpot: A Leading IT Consulting Firm & Key Offerings | **Executive Overview & Solutions Catalog**: Interactive filterable cards for Hardware, Cisco/Aruba Networking, Sophos/Palo Alto Security, HPE/Lenovo Cloud, Hikvision Surveillance, and Business Advisory with technical specs modals. |
| **Page 3** | Holistic Approach: 1. Comprehensive Analysis, 2. Data-Driven Insights | **5-Phase Transformation Framework**: Interactive phased sequence highlighting deep-dive audit, metric diagnostics, and capacity forecasting. |
| **Page 4** | Providing Guidance to Achieve Client Success: Strategic Planning, Operational Improvement, Performance Monitoring | **Execution Roadmap**: Detailed cards for strategic alignment, process optimization, zero-downtime hardware cutover, and 24/7 SLA governance. |
| **Page 5** | Highly Qualified Business Consultants: Finance, Marketing, Operations, Technology | **Executive Advisory Matrix**: "Industry Experts", "Proven Leaders", "Dedicated to Excellence" badges and 4 cross-functional practice area cards. |
| **Page 6** | Our Success Growth (Bar Chart of Latest Yearly Data) | **Interactive Financial Growth Visualizer**: Pixel-accurate Chart.js reproduction of audited growth from ₹1.75L to ₹2.96Cr+ (169x multiplier) with Bar vs Growth Curve toggle and YoY milestones. |
| **Page 7** | Partnering with Clients: 1. Open Communication, 2. Collaboration, 3. Shared Vision | **Interactive 3-Pillar Collaboration Model**: Interactive selection dial displaying governance principles, co-engineering guidelines, and long-term TCO optimization. |
| **Page 8** | Driving Your Business to the Success You Desire | **High-Conversion Enterprise RFP & Inquiries**: Validated consultation booking form with instant confetti celebration, mailto client generator (`info@stewpot.co.in`), and official links (`www.stewpot.in`). |
| **Page 9** | We Are Registered B2B Partner With (21 Brands) | **Master B2B Partner Directory**: Complete showcase of Cisco, HPE, HP Inc., Lenovo, Samsung, Sophos, Palo Alto Networks, Aruba, Ruckus, Hikvision, Hanwha Ocean, Sony, LG, Logitech, Microsoft Partner, Trend Micro, Axis, eSSL, Tata Teleservices, Vodafone, and Jio. |

---

## 🚀 Interactive Enterprise Tools Included

1. **Infrastructure & Solution Configurator**:
   - Allows CTOs, IT Directors, and procurement heads to select user count and technical layers (Laptops, Cisco core switching, Palo Alto firewalls, HPE servers, Hikvision CCTV).
   - Generates real-time OEM tier recommendations, deployment timelines, and SLA tier.
   - 1-Click transfer button pre-fills the official RFP inquiry form.

2. **Audited Growth Chart Engine**:
   - Exact yearly data:
     - **2019-2020**: ₹1,75,157
     - **2020-2021**: ₹1,90,860 (+8.9%)
     - **2021-2022**: ₹7,56,382 (+296.3%)
     - **2022-2023**: ₹53,42,719 (+606.3%)
     - **2023-2024**: ₹2,10,87,983 (+294.7%)
     - **2024-2025**: ₹2,96,43,333.97 (+40.6%)
   - Supports switching between Bar Chart and Exponential Growth Curve.

3. **Executive Theme Switcher**:
   - Supports both sleek Dark Mode (executive cyberpunk midnight) and clean Light Mode (corporate enterprise).
   - State persisted in `localStorage`.

4. **One-Click Corporate Brief Export**:
   - Built-in print stylesheet formatted to export clean, branded 1-page executive briefs via `Ctrl+P` or the "Export Brief" button.

---

## 💻 How to View & Preview

### Option 1: Direct File Preview
Simply double-click [`index.html`](index.html) in your file explorer to open it directly in Google Chrome, Microsoft Edge, or any modern browser.

### Option 2: Local HTTP Server (Running)
The website is currently hosted on local port 8080. You can access it anytime at:
- **`http://localhost:8080/index.html`**

Or start an alternative server at any time:
```powershell
python -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## 📂 Project Architecture
```
New folder/
├── index.html        # Complete semantic HTML5 structure & accessibility attributes
├── styles.css        # Custom animations, glassmorphism, marquee, and print rules
├── app.js            # Interactive chart, configurator engine, filters, and modals
├── assets/           # Local assets and vector brand elements
└── README.md         # Documentation & transformation mapping
```
