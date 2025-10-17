export interface SignatureData {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  phone: string;
}

export const signatureTemplates = {
  minimal: (data: SignatureData) => `
<table style="font-family: Arial, sans-serif; font-size: 14px; color: #1F2937; border-collapse: collapse;">
  <tr>
    <td style="padding: 0;">
      <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${data.firstName} ${data.lastName}</div>
      <div style="color: #6B7280; margin-bottom: 8px;">${data.position}</div>
      <div style="color: #6B7280;">${data.email}</div>
    </td>
  </tr>
</table>
  `.trim(),

  professional: (data: SignatureData) => `
<table style="font-family: Arial, sans-serif; font-size: 14px; color: #1F2937; border-collapse: collapse;">
  <tr>
    <td style="padding: 0; padding-right: 16px; vertical-align: top;">
      <div style="width: 64px; height: 64px; background-color: #2563EB; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; text-align: center; line-height: 64px;">
        LOGO
      </div>
    </td>
    <td style="padding: 0; vertical-align: top;">
      <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${data.firstName} ${data.lastName}</div>
      <div style="color: #6B7280; margin-bottom: 8px;">${data.position}</div>
      <div style="color: #6B7280; margin-bottom: 2px;">${data.email}</div>
      <div style="color: #6B7280; margin-bottom: 2px;">${data.phone}</div>
      <div style="color: #6B7280; margin-bottom: 8px;">www.company.com</div>
      <div style="display: flex; gap: 8px; margin-top: 12px;">
        <a href="https://linkedin.com" style="display: inline-block; width: 24px; height: 24px; background-color: #2563EB; border-radius: 50%; text-decoration: none;"></a>
        <a href="https://twitter.com" style="display: inline-block; width: 24px; height: 24px; background-color: #2563EB; border-radius: 50%; text-decoration: none;"></a>
        <a href="https://facebook.com" style="display: inline-block; width: 24px; height: 24px; background-color: #2563EB; border-radius: 50%; text-decoration: none;"></a>
      </div>
    </td>
  </tr>
</table>
  `.trim(),

  modern: (data: SignatureData) => `
<table style="font-family: Arial, sans-serif; font-size: 14px; color: #1F2937; border-collapse: collapse;">
  <tr>
    <td style="padding: 0; width: 4px; background-color: #10B981; border-radius: 2px;"></td>
    <td style="padding: 16px 0 16px 16px;">
      <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px; color: #1F2937;">${data.firstName} ${data.lastName}</div>
      <div style="color: #10B981; font-weight: 500; margin-bottom: 8px; font-size: 14px;">${data.position}</div>
      <div style="color: #6B7280; margin-bottom: 4px; font-size: 14px;">${data.email} | ${data.phone}</div>
      <div style="color: #2563EB; font-weight: 500; margin-top: 4px; font-size: 14px;">www.company.com</div>
    </td>
  </tr>
</table>
  `.trim(),
};

export const getSignaturePlainText = (data: SignatureData): string => {
  return `${data.firstName} ${data.lastName}
${data.position}
${data.email}
${data.phone}
www.company.com`;
};

export const getTemplateNameById = (templateId: number): keyof typeof signatureTemplates => {
  const templateMap: { [key: number]: keyof typeof signatureTemplates } = {
    1: 'minimal',
    2: 'professional',
    3: 'modern',
  };
  return templateMap[templateId] || 'professional';
};
