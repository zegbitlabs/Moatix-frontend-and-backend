# Moatix Check — Architectural Decisions & Open Questions

This document records architectural decisions made for the Moatix Check frontend foundation by **Member 1**, along with open questions for the Project Manager and cybersecurity reviewers.

---

## 1. Confirmed Decisions for Member 1 Deliverables

| Area | Decision | Rationale |
| :--- | :--- | :--- |
| **Scope Boundary** | Member 1 owns Layout, Shell, Design System, and Home Page only. | Per the team engineering allocation, Member 1 establishes the visual and structural foundation so Members 2 and 3 can build forms and results without duplicate styling. |
| **No Artificial / Stock Images** | All visuals are handcrafted using clean SVG schematics and CSS typography. | Keeps page load instantaneous, eliminates tacky AI-generated graphics, and presents an authentic, trustworthy cybersecurity identity. |
| **Font Stack & Localisation** | Native system font stack with explicit fallbacks for `Noto Sans Sinhala` and `Noto Sans Tamil`. | Guarantees seamless rendering across mobile devices in Sri Lanka without external font fetch dependencies during offline builds. |
| **Mandatory Demo Notice** | Persistent site-wide banner: *"Demo mode: the system is not currently assessing the safety of the submitted item."* | Strict adherence to Section 5 and PDF policy. Prevents visitors from mistaking simulated data for live cybersecurity protection. |
| **Color Tokens** | Strict adherence to approved palette: Deep Navy `#0B1730`, Dark Blue `#142B4D`, Professional Blue `#2563EB`, Teal `#0D9488`, Light Background `#F5F8FC`. | Consistent enterprise feel. Never conveys security status by color alone (always icon + label + sentence). |
| **Accessible Navigation** | Mobile drawer with Escape key support, skip-to-content anchor, visible focus rings, touch targets ≥ 44px. | Conforms to WCAG 2.1 AA accessibility guidelines. |

---

## 2. Document Discrepancy Resolutions

### 2.1 `/check` vs `/checks` and `/result` vs `/results`
- **Discrepancy:** The *Team Engineering Plan* uses `/check` and `/result/[id]`, while the *Comprehensive Handbook V2.0* uses `/checks` and `/results/[id]` for API endpoints and page routes.
- **Resolution:** Following the specification hierarchy rule (*Handbook V2.0 wins wherever the two PDFs disagree*), Member 1 provides navigation anchors aligned with `#methods` on the homepage and prepared routes for `/results/[id]`.

---

## 3. Open Questions for Project Manager & Cybersecurity Approval

1. **File Type Allowlist & Size Limits:**
   - *Current placeholder default:* PDF, DOCX, TXT (Max 10 MB); PNG, JPEG, WebP (Max 5 MB).
   - *Pending approval:* Security team must confirm whether SVG and macro-enabled documents (`.docm`) remain permanently prohibited.

2. **Anonymity & Data Retention Policy:**
   - *Current placeholder default:* Demo mode stores zero content on servers. Minimal session metadata is stored in browser memory only.
   - *Pending approval:* Backend team to define retention duration (e.g. 24 hours vs 30 days) and automated redaction pipeline for production.

3. **Inconclusive Result Phrasing:**
   - *Current placeholder default:* "Unable to verify: Insufficient public evidence exists to assess this item. Do not assume lack of data indicates safety."
   - *Pending approval:* Review by legal/compliance team.

4. **Risk Score Ownership:**
   - *Current placeholder default:* No numerical score is rendered in demo mode. In production, scores are only presented when verified by the cybersecurity scoring engine.
