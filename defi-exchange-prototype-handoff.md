# DeFi Exchange — Sponsor-Side Prototype
## Claude Code Build Handoff Document

**Version:** May 2026  
**Audience:** Claude Code  
**Purpose:** Build a clickable sponsor-side prototype for a real estate tokenization platform demo. The prototype is used in a live meeting on May 11 with a Dallas-based real estate group. It must tell a story, not demonstrate features.

---

## 1. What This Is and What It Is Not

**This IS:**
- A sponsor/operator-facing admin console
- A walkthrough of one asset's lifecycle from setup to distribution
- An institutional-grade interface that feels like a real product

**This is NOT:**
- A retail crypto app
- A public token marketplace
- A fully functional application — it is a demo prototype with realistic data

The entire prototype should feel like the sponsor is running a $50M real estate tokenization from their operating dashboard.

---

## 2. Demo Scenario — Use This Data Everywhere

Every screen, every number, every name should reference this single scenario consistently.

**Asset**
- Name: Meridian Multifamily Property I
- Type: Multifamily Residential
- Address: 4200 Maple Avenue, Dallas, TX 75219
- Asset Value: $50,000,000
- Legal Vehicle: Meridian Property Holdings LLC (Delaware SPV)
- Custodian: ACTC (Austin Capital Trust Company)

**Offering**
- Offering Name: Meridian Multifamily Series A
- Regulation: Reg D 506(c)
- Total Units: 50,000
- Unit Price: $1,000
- Raise Goal: $50,000,000
- Minimum Investment: $50,000
- Lock-Up Period: 12 months
- Status: Active

**Token**
- Token Name: Meridian Multifamily Token
- Symbol: MMT-01
- Blockchain: Ethereum (ERC-3643)
- Total Supply: 50,000
- Unit Price: $1,000
- Status: Active / Deployed

**Fundraise Progress (at demo time)**
- Capital Committed: $18,250,000 (36.5% of goal)
- Capital Funded: $11,500,000 (23% of goal)
- Investors: 24 registered, 18 verified, 14 accredited, 11 funded
- Tokens Minted: 11,500

**Featured Investor — Northstar Family Office**
- Entity Type: Family Office
- Jurisdiction: Texas, USA
- Commitment: $100,000
- Units Allocated: 100
- Ownership: 0.20%
- Wallet: 0x3a8F...d91C (allowlisted)
- KYC: Approved
- Accreditation: Verified
- Status: Funded / Token Issued

**Distribution Event (most recent)**
- Record Date: March 31, 2026
- Distribution Date: April 15, 2026
- Total Distributable: $312,500 (Q1 net rental income)
- Per Unit: $6.25
- Northstar Allocation: $625.00
- Payment Method: Wire (USD)
- Status: Completed

---

## 3. Technical Foundation

Build on the existing prototype codebase from the uploaded RWA.zip. Do not rebuild from scratch.

**Existing components to reuse:**
- `Rail` — left navigation sidebar (update labels, keep structure)
- `TopBar` — top bar with title, breadcrumbs, search, notification bell
- `Btn` — button component (primary, secondary, teal, ghost, danger variants)
- `Card` — card container with optional header and action
- `Pill` — status badge (neutral, teal, good, warn, bad, gold, dark)
- `BarChart`, `DonutChart` — chart components

**Design tokens to preserve:**
```
--rail: #08121F (left nav background)
--ink: #0A1628 (primary text)
--teal: #1F8E8E (primary accent)
--teal-soft: rgba(31,142,142,0.12)
--gold: #B8893A (secondary accent)
--good: #1E8F5E
--warn: #C27C18
--bad: #B03030
--bg: #F4F1EB (page background)
--panel: #FFFFFF (card background)
--line: #E4DDD0 (borders)
--muted: #7A7060 (secondary text)
Font display: Fraunces, serif
Font body: DM Sans, sans-serif (or existing sans)
```

**Brand identity:**
- Platform name: DeFi Exchange
- Workspace: Meridian Property Holdings LLC
- User: David Park, Issuer Admin

---

## 4. Navigation Structure

Update the left rail to exactly these items in this order:

```
[DeFi Exchange logo]
Workspace: Meridian Property Holdings LLC ▾

1. Dashboard
2. Assets
3. Offerings
4. Investors
5. Subscriptions
6. Tokenization
7. Holders Registry
8. Distributions
── Settings (bottom, secondary)
```

The workspace switcher at the top of the rail shows:
- "Meridian Property Holdings LLC"
- "Series A · Reg D 506(c)"
- Dropdown chevron (non-functional in demo)

---

## 5. Screen Specifications

### Screen 1 — Dashboard

**Purpose:** The sponsor's operational command center. First thing David shows in the meeting.

**Top section — Offering hero card (dark navy background)**
Full-width card showing:
- Left: Asset name "Meridian Multifamily Property I" with active status dot, reg type "Reg D 506(c)", token symbol "MMT-01 · ERC-3643", closing date "Jun 30, 2026"
- Stats row: Capital Committed $18.25M | Capital Funded $11.5M | Investors 24 | Avg Ticket $479K
- Progress bar: two-tone — funded (teal solid) + committed (teal transparent) against hard cap
- Milestone markers on bar: Offering Open / Soft Cap / Mid-Round / Hard Cap

**Stats row — 4 cards**
- Assets: 1 Active
- Tokens Minted: 11,500 / 50,000
- Verified Investors: 18
- Distributions Paid: $312,500

**Two-column middle section**
- Left: Capital inflow bar chart (daily, last 30 days) — reuse existing BarChart
- Right: Investor funnel showing Registered 24 → Verified 18 → Accredited 14 → Funded 11

**Activity feed (bottom)**
Recent events:
- Northstar Family Office — Tokens issued: 100 MMT-01 — 2 days ago
- Northstar Family Office — Subscription funded: $100,000 — 3 days ago
- Westbrook Capital — KYC approved — 4 days ago
- Meridian Series A — Distribution completed: $312,500 — 15 days ago
- Summit Ridge Partners — Accreditation verified — 5 days ago

---

### Screen 2 — Assets

**Purpose:** The real-world asset foundation. Shows the property before the token exists.

**Page layout:** Asset list with one asset, click through to Asset Detail.

**Asset List row:**
- Name: Meridian Multifamily Property I
- Type: Multifamily Residential
- Value: $50,000,000
- Status: Tokenized (teal pill)
- Offering: Series A
- Action: View button

**Asset Detail page (tabbed):**

Tab 1 — Overview:
Two-column form layout showing:
- Asset Name: Meridian Multifamily Property I
- Asset Type: Multifamily Residential
- Property Address: 4200 Maple Avenue, Dallas, TX 75219
- Legal Vehicle: Meridian Property Holdings LLC
- Jurisdiction: Delaware (SPV) / Texas (Property)
- Custodian: ACTC — Austin Capital Trust Company
- Asset Valuation: $50,000,000
- Valuation Date: January 15, 2026
- Currency: USD
- Status: Active

Tab 2 — Financial Structure:
- Asset Value: $50,000,000
- Raise Goal: $50,000,000
- Sponsor Equity: 20%
- Investor Equity: 80%
- Distribution Type: Cash Flow (Net Operating Income)
- Distribution Frequency: Quarterly
- Target IRR: 12–15%

Tab 3 — Documents (list):
- Operating Agreement.pdf — Executed Jan 2026
- Title Insurance.pdf — Issued Jan 2026
- Phase I ESA.pdf — Issued Dec 2025
- Appraisal Report.pdf — Issued Jan 2026
- PPM — Meridian Series A.pdf — Issued Feb 2026

---

### Screen 3 — Offerings

**Purpose:** Shows how the asset is legally structured for sale.

**Offering List:** One row — Meridian Multifamily Series A, Active, $18.25M / $50M committed.

**Offering Detail page (tabbed):**

Tab 1 — Structure:
- Offering Name: Meridian Multifamily Series A
- Regulation Type: Reg D 506(c)
- Raise Goal: $50,000,000
- Minimum Investment: $50,000
- Maximum Investment: No limit
- Investor Type: Accredited Investors Only
- Lock-Up Period: 12 months (from issuance date)
- Transfer Restriction: Enabled — eligible wallets only post lock-up
- Offering Status: Active (green pill)
- Offering Open Date: February 1, 2026
- Offering Close Date: June 30, 2026

Tab 2 — Compliance Config:
Checklist-style with status indicators:
- ✅ KYC/KYB Required — Third-party provider: Jumio
- ✅ OFAC / AML Screening — Checked at onboarding; ongoing monitoring active
- ✅ Accreditation Verification — Provider: VerifyInvestor.com — Rule 506(c) safe harbor — 90-day freshness window
- ✅ Bad Actor Questionnaire — Rule 506(d) — All covered persons cleared (issuer, officers, directors, 20% owners, promoters, placement agents)
- ✅ Tax Documentation — W-9 (U.S. persons) / W-8BEN (Non-U.S. persons) — Collected at subscription
- ✅ Wallet Allowlist — Smart contract enforced
- ✅ Subscription Agreement — DocuSign executed
- ✅ Private Placement Memorandum — Filed Feb 2026
- ✅ Form D Filing — Filed Feb 15, 2026 (EDGAR)
- ✅ State Notice Filings — TX, CA, NY, FL (filed)
- ✅ Legal Counsel Approval — Securities counsel confirmed

Tab 3 — Payment:
- Accepted Methods: Wire Transfer (USD), ACH, USDC (stablecoin)
- Escrow Agent: North Capital Private Securities
- Funding Deadline: June 30, 2026
- Escrow Balance: $11,500,000 (funded)
- Pending Funding: $6,750,000 (committed, awaiting wire)

Tab 4 — Fundraise Progress:
Progress section showing:
- Hard Cap: $50,000,000
- Total Committed: $18,250,000 — 36.5%
- Total Funded: $11,500,000 — 23.0%
- Remaining: $31,750,000
- Visual progress bar (two-tone, same as dashboard)

---

### Screen 4 — Investors

**Purpose:** The investor pipeline and approval lifecycle.

**Page layout:** Status filter tabs + investor table.

Status tabs (with counts):
All (24) | Registered (24) | Verified (18) | Accredited (14) | Signed (12) | Funded (11) | Holder (11)

**Investor table columns:**
Investor Name | Entity Type | Jurisdiction | Accreditation | Wallet | KYC Status | Commitment | Status

**Featured row — Northstar Family Office:**
- Entity: Family Office
- Jurisdiction: Texas, USA
- Accreditation: Verified (green pill)
- Wallet: 0x3a8F...d91C (green — allowlisted)
- KYC: Approved
- Commitment: $100,000
- Status: Holder (teal pill)

**Other sample rows:**
- Summit Ridge Partners | Family Office | California | Verified | Allowlisted | Approved | $500,000 | Holder
- Westbrook Capital LP | LP Fund | New York | Verified | Allowlisted | Approved | $1,000,000 | Holder
- Crescent Bay Holdings | Corp | Florida | Pending | Not yet | In Review | $250,000 | Accredited
- Pacific Rim Ventures | Family Office | Washington | Verified | Allowlisted | Approved | $750,000 | Holder

**Investor Detail page (click Northstar):**
Tabs: Overview | KYC & Accreditation | Wallet | Documents | Holdings

Overview tab:
- Investor Name: Northstar Family Office
- Entity Type: Family Office
- Primary Contact: James Whitfield, Managing Director
- Jurisdiction: Texas, USA
- Tax ID: On file
- Registration Date: February 14, 2026
- Status: Holder

KYC & Accreditation tab:
- KYC Provider: Jumio
- KYC Status: Approved — Feb 16, 2026
- AML / OFAC Screening: Clear — Feb 16, 2026 / Ongoing monitoring: Active
- Accreditation Method: VerifyInvestor.com — Rule 506(c) safe harbor
- Accreditation Type: Net worth > $1M (excluding primary residence)
- Accreditation Verified: Feb 18, 2026
- Verification Valid For: 90 days (Rule 506(c) freshness window)
- Reaffirmation Required After: May 19, 2026
- Bad Actor Check: Cleared — Feb 14, 2026
- Tax Documentation: W-9 on file — Feb 21, 2026

Wallet tab:
- Wallet Address: 0x3a8Fc2D4E6B9A1F7e3c5D8b4A2e9F1d3c6B8a0d91C
- Wallet Status: Allowlisted (green)
- Added to Allowlist: Feb 20, 2026
- Network: Ethereum Mainnet
- Allowlist Source: Smart contract — ERC-3643 Identity Registry

Holdings tab:
- Units Held: 100 MMT-01
- Cost Basis: $100,000
- Ownership: 0.20%
- Issuance Date: March 5, 2026
- Lock-Up Expires: March 5, 2027
- Transfer Eligible: No (in lock-up)
- Last Distribution: $625.00 (Q1 2026)

---

### Screen 5 — Subscriptions

**Purpose:** Track commitments and funding before token issuance.

**Page layout:** Status tabs + subscription table.

Status tabs:
All (24) | Committed (3) | Signed (12) | Funded (11) | Minted (11) | Cancelled (0)

**Table columns:**
Investor | Commitment | Payment Method | Signature | Funding | Units Reserved | Mint Status

**Sample rows:**
- Northstar Family Office | $100,000 | Wire | Signed | Funded | 100 | Minted ✅
- Summit Ridge Partners | $500,000 | Wire | Signed | Funded | 500 | Minted ✅
- Westbrook Capital LP | $1,000,000 | Wire | Signed | Funded | 1,000 | Minted ✅
- Pacific Rim Ventures | $750,000 | Wire | Signed | Funded | 750 | Minted ✅
- Crescent Bay Holdings | $250,000 | ACH | Signed | Pending | 250 | Pending ⏳
- Blue Harbor Capital | $300,000 | Wire | Pending | — | 300 | Not Ready

**Subscription Detail (click Northstar):**
- Commitment Amount: $100,000
- Units Reserved: 100
- Unit Price: $1,000
- Payment Method: Wire Transfer (USD)
- Wire Instructions: Provided Feb 20, 2026
- Subscription Agreement: Signed Feb 21, 2026 (DocuSign)
- Restricted Securities Legend: Acknowledged — Feb 21, 2026 (Rule 144 — 12-month holding period)
- W-9 / Tax Form: On file — Feb 21, 2026
- Funds Received: $100,000 — Feb 28, 2026
- Escrow Release: March 3, 2026
- Mint Status: Minted — 100 MMT-01 — March 5, 2026

---

### Screen 6 — Tokenization

**Purpose:** The smart contract configuration. DeFi Exchange's core capability.

**Page layout:** Three sections — Token Profile | Token Rules | Contract Status

**Token Profile section:**
- Token Name: Meridian Multifamily Token
- Token Symbol: MMT-01
- Token Standard: ERC-3643 (T-REX)
- Blockchain: Ethereum Mainnet
- Contract Address: 0x7B2E...c94A
- Total Supply: 50,000 units
- Unit Price: $1,000.00
- Tokens Minted: 11,500
- Tokens Remaining: 38,500
- Tokens Burned: 0

**Token Rules section (configured rules with on/off indicators):**
- ✅ Wallet Allowlist Enforcement — Only allowlisted wallets may receive tokens
- ✅ Accreditation Required — Holder must be accredited investor (Rule 506(c))
- ✅ Lock-Up Period — 12 months from issuance date per Rule 144
- ✅ Jurisdiction Restrictions — US accredited investors; Reg S offshore eligible
- ✅ Holder Count Cap — Maximum 1,999 holders (Section 12(g) threshold)
- ✅ Transfer Approval — Admin approval required for secondary transfers
- ✅ Forced Transfer — Controller can execute forced reassignment (OFAC/court order)
- ✅ Pause Capability — All transfers can be halted by admin

**Contract Status section:**
- Contract Status: Active (green pill)
- Deployed: March 1, 2026
- Last Action: Token minted — 100 MMT-01 to Northstar Family Office — March 5, 2026
- Admin Wallet: 0x1A4D...b82F (Multisig — 3 of 5)
- Upgrade Authority: ACTC Multisig (timelocked 48h)

**Token Actions (buttons, non-destructive in demo):**
Mint Tokens | Pause Contract | Block Wallet | Force Transfer | View on Etherscan

---

### Screen 7 — Holders Registry

**Purpose:** The ownership register. The most important screen for institutional credibility.

**Page header stats:**
- Total Holders: 11
- Total Units Issued: 11,500 / 50,000
- Total Value: $11,500,000
- Record Date: May 1, 2026

**Table columns:**
Investor | Wallet | Units Held | Ownership % | Cost Basis | Lock-Up Expiry | Transfer Eligible | Compliance

**Table rows:**
| Investor | Wallet | Units | Ownership | Cost Basis | Lock-Up | Transfer | Status |
|---|---|---|---|---|---|---|---|
| Northstar Family Office | 0x3a8F...d91C | 100 | 0.20% | $100,000 | Mar 5, 2027 | No | ✅ Compliant |
| Summit Ridge Partners | 0x9c2A...e44F | 500 | 1.00% | $500,000 | Mar 5, 2027 | No | ✅ Compliant |
| Westbrook Capital LP | 0x6f1B...a33D | 1,000 | 2.00% | $1,000,000 | Mar 5, 2027 | No | ✅ Compliant |
| Pacific Rim Ventures | 0x4d7C...c12E | 750 | 1.50% | $750,000 | Mar 5, 2027 | No | ✅ Compliant |
| Harrington & Co. | 0x8e3D...f55B | 2,000 | 4.00% | $2,000,000 | Mar 5, 2027 | No | ✅ Compliant |
| Ashford Capital Group | 0x2b5E...a77C | 1,500 | 3.00% | $1,500,000 | Mar 5, 2027 | No | ✅ Compliant |
| Clearwater Trust | 0x5a9F...d88A | 1,000 | 2.00% | $1,000,000 | Mar 5, 2027 | No | ✅ Compliant |
| Delta Growth Fund | 0x7c1A...e99D | 1,250 | 2.50% | $1,250,000 | Mar 5, 2027 | No | ✅ Compliant |
| Pinnacle Holdings | 0x3f8B...b10C | 750 | 1.50% | $750,000 | Mar 5, 2027 | No | ✅ Compliant |
| Lakefront Partners | 0x1d4D...c21E | 1,150 | 2.30% | $1,150,000 | Mar 5, 2027 | No | ✅ Compliant |
| Meridian GP | 0x9a2C...f32A | 1,500 | 3.00% | $1,500,000 | — | Yes | ✅ Compliant |

**Footer row:**
Total | — | 11,500 | 23.00% | $11,500,000 | — | — | —

**Audit trail section (below table):**
Recent registry events:
- March 5, 2026 — 100 MMT-01 issued to Northstar Family Office (0x3a8F...d91C) — Tx: 0xf3c...
- March 5, 2026 — 750 MMT-01 issued to Pacific Rim Ventures (0x4d7C...c12E) — Tx: 0x8d4...
- March 5, 2026 — 1,000 MMT-01 issued to Westbrook Capital LP (0x6f1B...a33D) — Tx: 0x2a7...
- March 3, 2026 — Smart contract deployed — Contract: 0x7B2E...c94A — Tx: 0x1b3...

---

### Screen 8 — Distributions

**Purpose:** Lifecycle servicing after issuance. Shows the platform earns its place beyond token issuance.

**Page layout:** Distribution Events list + detail view

**Distribution Events list:**
| Period | Record Date | Distribution Date | Total Amount | Per Unit | Holders Paid | Status |
|---|---|---|---|---|---|---|
| Q1 2026 | Mar 31, 2026 | Apr 15, 2026 | $312,500 | $6.25 | 11 | Completed ✅ |
| Q2 2026 | Jun 30, 2026 | Jul 15, 2026 | — | — | — | Upcoming ⏳ |

**Q1 2026 Distribution Detail:**

Header:
- Distribution Period: Q1 2026
- Record Date: March 31, 2026
- Distribution Date: April 15, 2026
- Total Net Distributable: $312,500
- Per Unit Distribution: $6.25
- Gross Rental Income (Q1): $425,000
- Operating Expenses: $87,500
- Debt Service Reserve: $25,000
- Net Distributable: $312,500
- Status: Completed

Investor allocation table:
| Investor | Units | Ownership | Gross Allocation | Withholding | Net Payment | Method | Status |
|---|---|---|---|---|---|---|---|
| Northstar Family Office | 100 | 0.20% | $625.00 | $0.00 | $625.00 | Wire | Paid ✅ |
| Summit Ridge Partners | 500 | 1.00% | $3,125.00 | $0.00 | $3,125.00 | Wire | Paid ✅ |
| Westbrook Capital LP | 1,000 | 2.00% | $6,250.00 | $0.00 | $6,250.00 | Wire | Paid ✅ |
| Harrington & Co. | 2,000 | 4.00% | $12,500.00 | $0.00 | $12,500.00 | Wire | Paid ✅ |
| Pacific Rim Ventures | 750 | 1.50% | $4,687.50 | $0.00 | $4,687.50 | Wire | Paid ✅ |
| Meridian GP | 1,500 | 3.00% | $9,375.00 | $0.00 | $9,375.00 | Wire | Paid ✅ |
| (remaining holders) | 5,750 | 11.50% | $35,937.50 | $0.00 | $35,937.50 | Wire | Paid ✅ |
| **Total** | **11,500** | **23.00%** | **$72,500.00** | — | — | — | — |

Note: Remaining $240,000 held in reserve for un-issued units (38,500 units × $6.25).

**Statements section:**
Buttons: Download Q1 Statements (All) | Generate Tax Schedules | View Audit Trail

---

## 6. Navigation and Click-Through Map

The prototype must support these click paths for the demo walkthrough:

```
Dashboard
  → click "View Offering" → Offerings (Meridian Series A detail)
  → click "Northstar Family Office" in activity feed → Investor Detail

Assets
  → click "Meridian Multifamily Property I" → Asset Detail (tabs)

Offerings
  → click "Meridian Multifamily Series A" → Offering Detail (tabs)

Investors
  → click "Northstar Family Office" → Investor Detail (tabs)
  → Investor Detail / Holdings tab shows 100 MMT-01

Subscriptions
  → click "Northstar Family Office" → Subscription Detail

Tokenization
  → single page showing profile + rules + contract status
  → "Mint Tokens" button opens a modal (non-functional, just shows UI)

Holders Registry
  → table with all 11 holders
  → click "Northstar Family Office" → shows same Investor Detail / Holdings tab

Distributions
  → click "Q1 2026" → Distribution Detail with allocation table
```

---

## 7. Demo Script Alignment

The demo follows this sequence. Each step maps to a screen.

1. **Start on Dashboard** — "This is the operating dashboard for a $50M multifamily property in Dallas that is being tokenized. You can see the offering is live, 24 investors have registered, $11.5M has been funded."

2. **Navigate to Assets** — "The asset starts here. The property profile, the legal vehicle, the custodian — all connected to the platform before a single token is issued."

3. **Navigate to Offerings** — "This is where the offering is configured. Reg D 506(c), $50,000 minimum, 12-month lock-up, Form D filed. The platform operationalizes what counsel defines."

4. **Navigate to Investors** — "Every investor goes through this funnel. Registered, verified, accredited, signed, funded, holder. Click on Northstar." → show Investor Detail.

5. **Navigate to Tokenization** — "This is where the digital unit structure lives. 50,000 units at $1,000 each. ERC-3643. The transfer restrictions you see here are enforced at the contract level — they run automatically on every transfer attempt."

6. **Navigate to Holders Registry** — "After issuance, this is the ownership register. Every holder, every wallet, every unit count, every compliance status. This is the record that drives distributions."

7. **Navigate to Distributions** — "Q1 2026, $312,500 in distributable income. The platform calculates each investor's allocation from the ownership register and sends the payment. Northstar received $625."

8. **Return to Dashboard** — "What you are looking at is the operating model around tokenized ownership. Asset structure, capital movement, ownership records, compliance controls, and lifecycle servicing. That is what DeFi Exchange provides."

---

## 8. Build Instructions for Claude Code

### Approach
- Extend the existing prototype files from RWA.zip
- Rename existing modules to match the new navigation
- Add the new screens: Assets, Offerings, Subscriptions, Distributions
- Update all data to use the Meridian scenario
- Keep the existing design system intact

### Module Rename Map
| Old Name | New Name | Page ID |
|---|---|---|
| Dashboard | Dashboard | `dashboard` |
| Onboarding | Investors | `investors` |
| Fundraise | Offerings | `offerings` |
| Holders | Holders Registry | `holders-registry` |
| Signatures | Subscriptions | `subscriptions` |
| Configuration → Token | Tokenization | `tokenization` |
| Configuration → Jurisdictions | Compliance | `compliance` |
| Configuration → Advanced | Administration | `administration` |

### New Modules to Build
| Module | Page ID | Priority |
|---|---|---|
| Assets | `assets` | High |
| Distributions | `distributions` | High |
| Asset Detail | `asset-detail` | High |
| Offering Detail | `offering-detail` | High |
| Investor Detail | `investor-detail` | High |

### File Structure
```
components/
  shell.jsx        — update Rail nav labels + add new page IDs
  app.jsx          — add routing for new page IDs
  dashboard.jsx    — update data to Meridian scenario
  assets.jsx       — NEW
  offerings.jsx    — rename/update from fundraise
  investors.jsx    — rename/update from onboarding
  subscriptions.jsx — rename/update from signatures
  tokenization.jsx  — extract from configuration
  holders-registry.jsx — rename/update from holders
  distributions.jsx — NEW
  investor-detail.jsx — NEW (shared detail view)
```

### Data Approach
All data is hardcoded for the demo. No API calls. No state persistence. Use JavaScript objects at the top of each component file for all demo data. Reference the scenario data from Section 2 of this document consistently across all screens.

### Typography
Preserve existing Fraunces serif for display numbers and page titles. Use DM Sans for body and table content.

### Status Pills — Use Consistently
- `Holder` → teal
- `Accredited` → good (green)
- `Verified` → good (green)
- `Funded` → teal
- `Pending` → warn (amber)
- `Minted` → teal
- `Completed` → good (green)
- `Active` → teal
- `Deployed` → teal
- `Upcoming` → warn (amber)
- `Allowlisted` → good (green)
- `Compliant` → good (green)

---

## 9. What Not to Build

Do not build:
- Login / authentication screens
- Settings or administration screens (low priority for demo)
- Compliance module in detail (nav item only, non-clickable in demo)
- Any screen beyond the 8 defined above
- Any API integration or backend connection
- Wallet connection flows
- Actual smart contract interaction

The demo must be completeable in 8 clicks. Every additional screen that is not on the click path adds risk without adding value.

---

## 10. Acceptance Criteria

The prototype is ready when:

1. Left rail shows all 8 navigation items with correct labels
2. Workspace switcher shows "Meridian Property Holdings LLC · Series A · Reg D 506(c)"
3. Dashboard loads with Meridian data and all 4 stat cards correct
4. All 8 screens are reachable from the nav
5. The demo click path in Section 6 works end-to-end without dead ends
6. Northstar Family Office data is consistent across Investors, Subscriptions, Holders Registry, and Distributions
7. Numbers are internally consistent (11,500 minted = 11 holders at various amounts = $11.5M funded)
8. No screen shows placeholder "Lorem ipsum" or generic dummy data

---

*DeFi Exchange Sponsor-Side Prototype · Claude Code Handoff · May 2026*
