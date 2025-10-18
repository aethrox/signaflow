# SignaFlow API Documentation

> **⚠️ PROJECT STATUS: DISCONTINUED (Oct 18, 2025)**
> 
> **IMPORTANT:** This is a **PLANNED API design** that was **NOT IMPLEMENTED**. 
> 
> The backend (Supabase) integration was never completed. The only working endpoint is the N8N webhook for signature generation.
>
> **Working Endpoint:**
> - `POST /webhook/generate-signature` (N8N workflow)
> 
> **Not Implemented:**
> - All REST API endpoints below
> - Authentication system
> - Database operations
> - Rate limiting

---

## 🔗 N8N Webhook (IMPLEMENTED)

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

**Response (200 OK):**
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

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation hatası",
  "details": ["Eksik alan: employee.email"]
}
```

---

## 📋 Planned REST API Endpoints (NOT IMPLEMENTED)

> **⚠️ The following endpoints were designed but never implemented.**

### Authentication (Planned)

```http
POST /auth/signup
Body: { email, password, company_name }
Response: { user, token }

POST /auth/login  
Body: { email, password }
Response: { user, token }
```

**Status:** ❌ Not implemented (Supabase Auth planned but not integrated)

---

### Employees (Planned)

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

**Status:** ❌ Not implemented (Frontend uses mock data only)

---

### Templates (Planned)

```http
GET /api/templates
Response: [{ id, name, html, is_active, department }]

POST /api/templates
Body: { name, html, department?, variables[] }
Response: { id, ...template }

PUT /api/templates/:id/activate
Response: { success: true }
```

**Status:** ❌ Not implemented (Templates are hardcoded in frontend)

---

### Signatures (Planned)

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

**Status:** ❌ Not implemented (Only N8N webhook works for generation)

---

### Campaigns/Banners (Planned)

```http
GET /api/banners
Response: [{ id, name, html, schedule, is_active }]

POST /api/banners
Body: { name, html, start_date, end_date }
Response: { id, ...banner }
```

**Status:** ❌ Not implemented (Frontend uses local state only)

---

## 📄 Webhooks (Planned)

```http
POST /webhook/employee-created
Triggered: New employee added
Payload: { employee }

POST /webhook/template-changed
Triggered: Template activated
Payload: { template, affected_employees }
```

**Status:** ❌ Not implemented (No backend triggers)

---

## 📊 Response Formats (Planned)

### Success
```json
{
  "success": true,
  "data": { ... },
  "message": "İşlem başarılı"
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email formatı hatalı"
  }
}
```

**Status:** ⚠️ Format used in N8N webhook, but not in REST API

---

## 🚀 Rate Limits (Planned)

- Auth endpoints: 5 req/min
- API endpoints: 100 req/min
- Bulk operations: 10 req/hour

**Status:** ❌ Not implemented (No rate limiting exists)

---

## 🧪 Testing

### N8N Webhook Test (Working)

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

### REST API Test (Not Working)

The following Postman examples were planned but cannot be tested:

```
POST localhost:3000/auth/login
GET localhost:3000/api/employees
POST localhost:3000/api/signatures/generate
```

**Status:** ❌ No backend server exists

---

## 📝 Implementation Notes

**What Was Built:**
- N8N workflow with 11 nodes
- Webhook endpoint for signature generation
- Input validation
- HTML generation for 3 templates
- Campaign banner injection
- Plain text conversion

**What Was Not Built:**
- REST API server
- Database (Supabase)
- Authentication system
- CRUD operations
- Rate limiting
- API documentation server (Swagger)

---

## 🔗 Related Documentation

- See `/docs/n8n-workflow-guide.md` for N8N setup instructions
- See main `README.md` for project status and discontinuation reason

---

**Last Updated:** October 18, 2025  
**Status:** Planned API - Not Implemented