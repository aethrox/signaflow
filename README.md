# signaflow
A cloud-based SaaS product that fully automates companies' email signature management through a centralized platform and transforms every sent email into an effective marketing and communication channel.
# SignaFlow - Email Signature Management Platform

> **⚠️ PROJECT STATUS: DISCONTINUED (Oct 18, 2025)**
> 
> **Why Stopped:** Gmail's HTML rendering restrictions prevent automated signature installation - the core value proposition. Even $50/month competitors (WiseStamp, Exclaimer) face this limitation and use browser extensions instead.
> 
> **Completion:** 90% feature-complete MVP with working N8N API, but lacks viable deployment method.
> 
> **Key Learning:** Always validate technical constraints before building. This project demonstrates full-stack skills but wasn't production-viable.

---

## 🎯 What Was Built

**Problem:** Companies struggle to keep 50+ employee email signatures consistent and updated.

**Solution:** Centralized dashboard to manage signatures with templates, campaigns, and KVKK compliance.

**Tech Stack:** React + TypeScript + Tailwind + N8N + (planned) Supabase

**Features Completed:**
- ✅ Dashboard with metrics
- ✅ Employee CRUD with bulk operations
- ✅ 3 signature templates (Professional, Minimal, Modern)
- ✅ Campaign banners with date scheduling
- ✅ Settings (Company info, Legal/KVKK compliance)
- ✅ Mobile responsive UI
- ✅ Loading states, validation, error handling
- ✅ N8N workflow for signature generation (working API)
- ❌ Gmail automated installation (not possible)

---

## 🚀 Quick Start

```bash
# Install
git clone [repo]
npm install

# Configure
echo "VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/generate-signature" > .env

# Run
npm run dev
```

**N8N Setup:** See workflow diagram and codes in `/docs/n8n-workflow-guide.md`

---

## 🏗 Architecture

```
React Frontend → N8N Webhook API → Generated HTML Signature → Manual Gmail Installation
```

**Database Schema (not implemented):**
- companies, employees, templates, campaigns, signatures, settings

---

## 📋 Key Files

```
src/
├── components/pages/          # Dashboard, Employees, Templates, Campaigns, Settings
├── services/signatureApi.ts   # N8N integration
└── utils/signatureGenerator.ts # Mock data

docs/
├── signaflow-intro.md         # Business overview
├── signaflow-api-docs.md      # API specs
├── n8n-workflow-guide.md      # N8N setup (11 nodes)
└── signaflow-deployment.md    # Deployment guide
```

---

## 💡 Lessons Learned

1. **Validate core assumptions first** - Gmail limitation should have been discovered Day 1, not Day 14
2. **Research competitor implementation** - Features alone don't reveal technical constraints
3. **Know when to stop** - 90% complete ≠ viable product
4. **Email clients are restrictive** - Security policies prevent automation even for paid tools

---

## 🔮 What Could Have Worked

- **Outlook-first pivot** - Better API access via Microsoft Graph
- **Browser extension** - Bypass Gmail restrictions (like WiseStamp)
- **Different use case** - Newsletter templates instead of signatures
- **Design-only tool** - Remove automation promise, focus on templates

---

## 📊 Stats

- **Development:** 14 days
- **Components:** 40+
- **Lines of Code:** ~8,000
- **Completion:** 90% (29/35 features)
- **N8N Nodes:** 11

---

## 📝 N8N Workflow Summary

**11 Nodes:** Webhook → Validate → Router → 3 Template Builders → Merge → Campaign → Legal → Plain Text → Response

**Input:** Employee + Template + Company + Campaign data  
**Output:** HTML signature + Plain text version

Full setup guide with code in `/docs/n8n-workflow-guide.md`

---

## 🔗 Related Docs

- `signaflow-intro.md` - Business plan & market analysis
- `signaflow-api-docs.md` - API endpoints & schemas
- `signaflow-deployment.md` - Deployment checklist
- `n8n-workflow-guide.md` - Step-by-step N8N setup

---

## 📄 License

Private repository - Learning project

---

**Built:** Oct 4-18, 2025 | **Status:** Discontinued | **Reason:** Technical limitation discovered