# 📡 SignaFlow API Documentation

> **⚠️ PROJECT STATUS: DISCONTINUED (Oct 18, 2025)**
> 
> **HEADS UP:** This is a **PLANNED API design** that **NEVER GOT BUILT** 😅
> 
> The backend (Supabase) integration? Yeah, that never happened. The only thing that actually works is the N8N webhook for signature generation.
>
> **What Actually Works:**
> - ✅ `POST /webhook/generate-signature` (N8N workflow)
> 
> **What Doesn't Work:**
> - ❌ All the REST API endpoints below
> - ❌ Authentication system
> - ❌ Database operations
> - ❌ Rate limiting
> - ❌ Pretty much everything else

---

## 🔗 N8N Webhook (THE ONLY WORKING THING)

### Generate Signature

**Endpoint:** `POST /webhook/generate-signature`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "employee": {
    "firstName": "Ahmet",
    "lastName": "Yılmaz",
    "email": "ahmet@company.com",
    "position": "CEO",
    "department": "Executive",
    "phone": "+90 555 123 4567"
  },
  "template": {
    "id": "professional",
    "name": "Professional"
  },
  "company": {
    "name": "Company Ltd.",
    "domain": "company.com",
    "brandColor": "#2B4C8C"
  },
  "campaign": {
    "isActive": true,
    "title": "Summer Sale",
    "message": "Get 25% off!",
    "linkUrl": "https://company.com/sale"
  }
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "signatureHtml": "<table>...</table>",
  "signaturePlainText": "Ahmet Yılmaz\nCEO\n...",
  "metadata": {
    "template": "professional",
    "generatedAt": "2025-10-18T12:00:00Z",
    "hasCampaign": true
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation error",
  "details": ["Missing field: employee.email"]
}
```

---

## 📋 Planned REST API Endpoints (NEVER BUILT)

> **⚠️ Everything below this point is fiction. None of it exists.**

### Authentication (Never Implemented) 🔒

```http
POST /auth/signup
Body: { email, password, company_name }
Response: { user, token }

POST /auth/login  
Body: { email, password }
Response: { user, token }
```

**Status:** ❌ Supabase Auth was on the roadmap but... nope

---

### Employees (Never Implemented) 👥

```http
GET /api/employees
Response: [{ id, name, email, department, title }]

POST /api/employees
Body: { name, email, department, title, phone }
Response: { id, ...employee }

PUT /api/employees/:id
Body: { ...updates }

DELETE /api/employees/:id  
Response: { success: true }
```

**Status:** ❌ Frontend uses mock data. There's no backend to talk to.

---

### Templates (Never Implemented) 🎨

```http
GET /api/templates
Response: [{ id, name, html, is_active, department }]

POST /api/templates
Body: { name, html, department?, variables[] }
Response: { id, ...template }

PUT /api/templates/:id/activate
Response: { success: true }
```

**Status:** ❌ Templates are hardcoded in the frontend. That's it.

---

### Signatures (Never Implemented) ✍️

```http
GET /api/signatures/preview
Query: ?employee_id=123&template_id=456
Response: { html: "<table>...</table>" }

POST /api/signatures/generate
Body: { employee_id, template_id }
Response: { signature_html, copy_instructions }

POST /api/signatures/bulk-update
Body: { template_id, department? }
Response: { updated_count: 50 }
```

**Status:** ❌ Only N8N webhook works for generation. No database, no bulk updates.

---

### Campaigns/Banners (Never Implemented) 🎯

```http
GET /api/banners
Response: [{ id, name, html, schedule, is_active }]

POST /api/banners
Body: { name, html, start_date, end_date }
Response: { id, ...banner }
```

**Status:** ❌ Frontend uses local state. No persistence whatsoever.

---

## 📄 Webhooks (Never Implemented) 🪝

```http
POST /webhook/employee-created
Triggered: New employee added
Payload: { employee }

POST /webhook/template-changed
Triggered: Template activated
Payload: { template, affected_employees }
```

**Status:** ❌ No backend = no webhooks. Simple math.

---

## 📊 Response Formats (Planned)

### Success
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format"
  }
}
```

**Status:** ⚠️ This format is used in the N8N webhook, but not in any REST API (because there is no REST API)

---

## 🚀 Rate Limits (Never Implemented)

**The Plan:**
- Auth endpoints: 5 req/min
- API endpoints: 100 req/min
- Bulk operations: 10 req/hour

**The Reality:** ❌ No rate limiting exists anywhere

---

## 🧪 Testing

### N8N Webhook Test (Actually Works!) ✅

```bash
curl -X POST https://your-n8n.com/webhook/generate-signature \
  -H "Content-Type: application/json" \
  -d '{
    "employee": {
      "firstName": "Ahmet",
      "lastName": "Yılmaz",
      "email": "ahmet@company.com",
      "position": "CEO",
      "department": "Executive"
    },
    "template": {
      "id": "professional"
    },
    "company": {
      "name": "Company Ltd.",
      "domain": "company.com",
      "brandColor": "#2B4C8C"
    }
  }'
```

### REST API Test (Doesn't Work) ❌

These Postman examples look cool, but they don't do anything:

```
POST localhost:3000/auth/login       ❌ No server
GET localhost:3000/api/employees     ❌ No database
POST localhost:3000/api/signatures   ❌ No backend
```

**Reality Check:** There's literally no server to test against 😅

---

## 📝 What Actually Got Built vs. What Didn't

### ✅ What Works:
- N8N webhook endpoint (`POST /webhook/generate-signature`)
- Signature HTML generation (3 templates)
- Campaign banner injection
- Input validation
- Error responses

### ❌ What Doesn't Work:
- REST API server (never created)
- Database (Supabase sitting there, unused)
- Authentication (no users, no sessions)
- CRUD operations (all of them)
- Rate limiting (anyone can spam the webhook)
- API documentation server (no Swagger, no nothing)

---

## 💭 Why This API Was Never Built

**The Short Version:** I built the frontend first, then realized the core feature (automated signature installation) was technically impossible. So I stopped before building the backend.

**The Long Version:**
1. Spent time designing this beautiful API 📐
2. Built the N8N workflow ✅
3. Started frontend work 🎨
4. Discovered Gmail/Outlook block automated signatures 😱
5. Realized the entire product concept was flawed 💔
6. Discontinued project before backend work 🛑

**Lesson:** Validate your core technical assumptions BEFORE writing API docs 🎓

---

## 🔗 Related Docs

- See `/docs/n8n-workflow-guide.md` for the thing that actually works
- See main `README.md` for the full story of why this failed

---

**Last Updated:** October 18, 2025  
**Status:** Fictional API - Never Implemented  
**Moral of the Story:** Sometimes the best code is the code you don't write

---

*"I spent more time documenting this API than it would have taken to realize it shouldn't exist."* 😅