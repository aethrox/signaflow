# 🔧 N8N Workflow Guide - SignaFlow

> **✅ STATUS: IMPLEMENTED & WORKING**
> 
> This is the **ONLY functional component** of the SignaFlow project 🎉
> 
> **What Actually Works:**
> - ✅ Webhook endpoint for signature generation
> - ✅ Input validation (so nothing breaks)
> - ✅ HTML template generation (3 cool designs)
> - ✅ Campaign banner injection
> - ✅ Plain text conversion (for old-school email clients)
> - ✅ Error handling
> 
> **Stats:**
> - **Total Nodes:** 11
> - **Setup Time:** 30 minutes
> - **Success Rate:** 98% (in my testing)

---

## 🎯 What This Workflow Does

Basically, you send employee data to a webhook, and it spits out a formatted email signature. That's it. Simple but effective 💪

**Workflow URL:** `POST /webhook/generate-signature`

---

## 🏗️ How It Works

```
[Webhook Trigger] 📨
       ↓
[Input Validation] ✅ (check if all required fields are there)
       ↓
[Template Selection] 🎨 → Professional / Modern / Minimal
       ↓
[Employee Data Processing] 👤
       ↓
[Campaign Banner Check] 🎯 → Add Banner (if active)
       ↓
[HTML Generation] 📝
       ↓
[Plain Text Conversion] 📄 (backup for email clients)
       ↓
[Response Formatting] 🎁
```

---

## 📋 The 11 Nodes Explained

### 1. Webhook Trigger 📨
**Node Type:** `Webhook`  
**Method:** `POST`  
**Path:** `/webhook/generate-signature`

**Config:**
```json
{
  "httpMethod": "POST",
  "path": "generate-signature",
  "responseMode": "responseNode",
  "authentication": "none"
}
```

**What it does:** Waits for someone to ping the endpoint with employee data.

---

### 2. Input Validation ✅
**Node Type:** `Code (JavaScript)`

**Checks for:**
- Required fields: `employee.firstName`, `employee.lastName`, `employee.email`
- Valid email format
- Valid template ID
- Company name exists

**The Code:**
```javascript
const input = $input.all()[0].json;

// Check required fields
const required = ['employee.firstName', 'employee.lastName', 'employee.email', 'template.id', 'company.name'];
const missing = [];

required.forEach(field => {
  const keys = field.split('.');
  let value = input;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  if (!value) missing.push(field);
});

if (missing.length > 0) {
  return {
    json: {
      success: false,
      error: "Validation error",
      details: missing.map(f => `Missing field: ${f}`)
    }
  };
}

// Email format check
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(input.employee.email)) {
  return {
    json: {
      success: false,
      error: "Invalid email format"
    }
  };
}

// Valid templates
const validTemplates = ['professional', 'modern', 'minimal'];
if (!validTemplates.includes(input.template.id)) {
  return {
    json: {
      success: false,
      error: "Invalid template ID",
      validTemplates
    }
  };
}

return { json: { success: true, data: input } };
```

**Why this matters:** Prevents garbage data from breaking everything 🛡️

---

### 3. Template Selection Switch 🎨
**Node Type:** `Switch`

**Routes:**
- `professional` → Professional Template
- `modern` → Modern Template
- `minimal` → Minimal Template
- Default → Error Response

**Config:**
```json
{
  "mode": "expression",
  "expression": "={{ $json.data.template.id }}"
}
```

---

### 4. Professional Template Generator 💼
**Node Type:** `Code (JavaScript)`

**Generates this:**
```html
<table style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <tr>
    <td style="padding-right: 20px; border-right: 2px solid #2B4C8C;">
      <strong style="font-size: 16px; color: #2B4C8C;">{{firstName}} {{lastName}}</strong><br>
      <span style="color: #666;">{{position}}</span><br>
      <span style="color: #666;">{{department}}</span>
    </td>
    <td style="padding-left: 20px;">
      <strong style="color: #2B4C8C;">{{companyName}}</strong><br>
      📧 <a href="mailto:{{email}}" style="color: #2B4C8C; text-decoration: none;">{{email}}</a><br>
      📞 {{phone}}<br>
      🌐 <a href="https://{{companyDomain}}" style="color: #2B4C8C; text-decoration: none;">{{companyDomain}}</a>
    </td>
  </tr>
</table>
```

**The Code:**
```javascript
const data = $input.all()[0].json.data;
const { employee, company } = data;

const html = `
<table style="font-family: Arial, sans-serif; font-size: 14px; color: #333; border-collapse: collapse;">
  <tr>
    <td style="padding-right: 20px; border-right: 2px solid ${company.brandColor || '#2B4C8C'}; vertical-align: top;">
      <strong style="font-size: 16px; color: ${company.brandColor || '#2B4C8C'};">${employee.firstName} ${employee.lastName}</strong><br>
      <span style="color: #666;">${employee.position || ''}</span><br>
      <span style="color: #666;">${employee.department || ''}</span>
    </td>
    <td style="padding-left: 20px; vertical-align: top;">
      <strong style="color: ${company.brandColor || '#2B4C8C'};">${company.name}</strong><br>
      📧 <a href="mailto:${employee.email}" style="color: ${company.brandColor || '#2B4C8C'}; text-decoration: none;">${employee.email}</a><br>
      ${employee.phone ? `📞 ${employee.phone}<br>` : ''}
      🌐 <a href="https://${company.domain}" style="color: ${company.brandColor || '#2B4C8C'}; text-decoration: none;">${company.domain}</a>
    </td>
  </tr>
</table>
`.trim();

return { 
  json: { 
    html, 
    template: 'professional',
    data 
  } 
};
```

---

### 5. Modern Template Generator ✨
**Node Type:** `Code (JavaScript)`

**Style:** Gradient background, rounded corners, modern vibes

```html
<div style="font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 13px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 8px;">
    <h3 style="margin: 0 0 5px 0; font-size: 18px;">{{firstName}} {{lastName}}</h3>
    <p style="margin: 0; opacity: 0.9;">{{position}} • {{department}}</p>
  </div>
  <div style="padding: 15px 0;">
    <p style="margin: 5px 0;">✉️ {{email}}</p>
    <p style="margin: 5px 0;">📱 {{phone}}</p>
    <p style="margin: 5px 0;">🔗 <a href="https://{{companyDomain}}">{{companyDomain}}</a></p>
  </div>
</div>
```

---

### 6. Minimal Template Generator 🎯
**Node Type:** `Code (JavaScript)`

**Style:** Clean, simple, monospace font - for the minimalists

```html
<div style="font-family: 'Courier New', monospace; font-size: 12px; color: #333;">
  <p style="margin: 0;"><strong>{{firstName}} {{lastName}}</strong> | {{position}}</p>
  <p style="margin: 5px 0 0 0;">{{email}} | {{phone}} | {{companyDomain}}</p>
</div>
```

---

### 7. Campaign Banner Check 🎯
**Node Type:** `IF`

**Condition:**
```javascript
{{ $json.data.campaign && $json.data.campaign.isActive === true }}
```

**Branches:**
- True → Add the banner 🎉
- False → Skip it ⏭️

---

### 8. Campaign Banner Injection 🎨
**Node Type:** `Code (JavaScript)`

**What it does:** Adds a promotional banner below the signature

```javascript
const { html, data } = $input.all()[0].json;
const { campaign } = data;

const bannerHtml = `
<div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid ${data.company.brandColor || '#2B4C8C'}; border-radius: 4px;">
  <strong style="color: ${data.company.brandColor || '#2B4C8C'}; font-size: 14px;">${campaign.title}</strong>
  <p style="margin: 5px 0; font-size: 13px; color: #666;">${campaign.message}</p>
  ${campaign.linkUrl ? `<a href="${campaign.linkUrl}" style="color: ${data.company.brandColor || '#2B4C8C'}; text-decoration: none; font-weight: bold;">Learn More →</a>` : ''}
</div>
`;

return {
  json: {
    html: html + bannerHtml,
    hasCampaign: true,
    data
  }
};
```

---

### 9. Plain Text Conversion 📄
**Node Type:** `Code (JavaScript)`

**Why?** Some email clients don't do HTML. This gives them a backup.

```javascript
const { html, data } = $input.all()[0].json;
const { employee, company, campaign } = data;

let plainText = `${employee.firstName} ${employee.lastName}\n`;
if (employee.position) plainText += `${employee.position}\n`;
if (employee.department) plainText += `${employee.department}\n`;
plainText += `\n${company.name}\n`;
plainText += `Email: ${employee.email}\n`;
if (employee.phone) plainText += `Phone: ${employee.phone}\n`;
plainText += `Web: ${company.domain}\n`;

if (campaign?.isActive) {
  plainText += `\n---\n${campaign.title}\n${campaign.message}\n`;
  if (campaign.linkUrl) plainText += `${campaign.linkUrl}\n`;
}

return {
  json: {
    html,
    plainText,
    data
  }
};
```

---

### 10. Success Response ✅
**Node Type:** `Respond to Webhook`

**Returns:**
```json
{
  "success": true,
  "signatureHtml": "<table>...</table>",
  "signaturePlainText": "John Doe\nSoftware Engineer...",
  "metadata": {
    "template": "professional",
    "generatedAt": "2025-10-18T12:00:00.000Z",
    "hasCampaign": true
  }
}
```

---

### 11. Error Response ❌
**Node Type:** `Respond to Webhook`

**Returns:**
```json
{
  "success": false,
  "error": "Something went wrong",
  "details": "Missing field: employee.email"
}
```

**Status Code:** `400`

---

## 🚀 How to Set This Up

### What You Need
- N8N instance (cloud or self-hosted)
- 30 minutes of your time ⏱️

### Steps

**1. Import the Workflow**
- Open N8N
- Click **Workflows** → **Import from File**
- Upload `signaflow-signature-generator.json`

**2. Activate It**
- Open workflow
- Click **Webhook** node
- Copy webhook URL
- Hit **Execute Workflow** to turn it on

**3. Test It**
```bash
curl -X POST https://your-n8n.app/webhook/generate-signature \
  -H "Content-Type: application/json" \
  -d '{
    "employee": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@company.com",
      "position": "Software Engineer",
      "department": "Engineering",
      "phone": "+1 555 123 4567"
    },
    "template": {
      "id": "professional"
    },
    "company": {
      "name": "Tech Company Inc.",
      "domain": "techcompany.com",
      "brandColor": "#2B4C8C"
    },
    "campaign": {
      "isActive": true,
      "title": "Summer Sale",
      "message": "Get 25% off all products!",
      "linkUrl": "https://techcompany.com/sale"
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "signatureHtml": "<table>...</table>",
  "signaturePlainText": "John Doe\nSoftware Engineer...",
  "metadata": {
    "template": "professional",
    "generatedAt": "2025-10-18T12:00:00.000Z",
    "hasCampaign": true
  }
}
```

---

## 📊 Performance Stats

- **Execution Time:** ~200ms ⚡
- **Success Rate:** 98% (during testing)
- **Payload Size:** ~2KB
- **Supported Templates:** 3

---

## 🐛 Common Problems (and Fixes)

### Problem: Webhook not responding 😴
**Why:** Workflow isn't activated  
**Fix:** Click the "Execute Workflow" button

### Problem: "Invalid template" error ❌
**Why:** Wrong template ID  
**Fix:** Use `professional`, `modern`, or `minimal`

### Problem: Missing fields error 🚫
**Why:** You didn't send all required data  
**Fix:** Check Node 2 validation requirements

### Problem: HTML not showing in email 📧
**Why:** Email client doesn't support HTML  
**Fix:** Use the `signaturePlainText` from response

---

## 🔒 Security Warning

**⚠️ THIS WEBHOOK HAS NO AUTH** 

**What that means:**
- Anyone with the URL can use it
- No rate limiting
- No fancy security

**For production, you should:**
- Add API key authentication 🔑
- Implement rate limiting ⏱️
- Add input sanitization 🧹
- Use HTTPS only 🔐
- Log all requests 📝

---

## 🔮 Future Ideas (That I Never Built)

- [ ] Multi-language support 🌍
- [ ] Custom template uploads 📤
- [ ] Image/logo support 🖼️
- [ ] Social media icons 📱
- [ ] QR code generation 📱
- [ ] Analytics tracking 📊
- [ ] A/B testing for campaigns 🧪

---

## 📦 Export This Workflow

**File:** `signaflow-signature-generator.json`  
**Size:** ~8KB  
**Nodes:** 11  
**Version:** 1.0

**To export:**
1. Open workflow in N8N
2. Click **⋮** menu
3. Select **Download**
4. Save as `signaflow-signature-generator.json`

---

## 🔗 Related Docs

- Main project README for full context
- `signaflow-api-docs.md` for API specs (planned but not built)
- `signaflow-deployment.md` for what didn't happen 😅

---

**Last Updated:** October 18, 2025  
**Status:** Working & Documented ✅  
**Maintainer:** Me (project discontinued though)

---

*"The only part of SignaFlow that actually shipped. Small victories!"* 🎉