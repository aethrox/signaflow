const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://sldzx1zf.rcld.app/webhook/generate-signature';

interface GenerateSignatureRequest {
  employee: {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department?: string;
    phone?: string;
    linkedin?: string;
  };
  template: {
    id: string;
    name: string;
  };
  company: {
    name: string;
    domain: string;
    logoUrl?: string;
    brandColor: string;
    socialMedia?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
    };
  };
  campaign?: {
    isActive: boolean;
    title: string;
    message: string;
    linkUrl: string;
  };
  legal?: {
    kvkkText?: string;
    disclaimer?: string;
    confidentiality?: string;
  };
}

interface GenerateSignatureResponse {
  success: boolean;
  signatureHtml: string;
  signaturePlainText: string;
  metadata: {
    template: string;
    generatedAt: string;
    hasCampaign: boolean;
    hasLegal: boolean;
  };
}

export async function generateSignature(
  data: GenerateSignatureRequest
): Promise<GenerateSignatureResponse> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Signature generation failed:', error);
    throw error;
  }
}
