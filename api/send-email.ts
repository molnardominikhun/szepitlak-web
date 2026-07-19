import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Csak a POST metódust engedélyezzük
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, phone, email, location, description } = req.body;

    // Alapvető validáció
    if (!name || !phone || !email || !location || !description) {
      return res.status(400).json({ error: 'Hiányzó kötelező mezők' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Szépít-Lak Weboldal <onboarding@resend.dev>',
      to: 'szepitlakinfo@gmail.com',
      replyTo: email,
      subject: `Szépít-Lak ajánlatkérés – ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c;">
          <h2 style="color: #1b4332; border-bottom: 2px solid #1b4332; padding-bottom: 10px; margin-top: 0;">
            Új ajánlatkérés érkezett
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; border-bottom: 1px solid #edf2f7;">Név:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #edf2f7;">Telefonszám:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;">
                <a href="tel:${phone.replace(/\s+/g, '')}" style="color: #1b4332; text-decoration: none; font-weight: 600;">
                  ${phone}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #edf2f7;">E-mail-cím:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;">
                <a href="mailto:${email}" style="color: #1b4332; text-decoration: none;">
                  ${email}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #edf2f7;">Helyszín:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;">${location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #edf2f7;">Dátum:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;">${new Date().toLocaleString('hu-HU')}</td>
            </tr>
          </table>

          <div style="margin-top: 30px;">
            <h3 style="color: #2d3748; margin-bottom: 10px; border-bottom: 1px solid #edf2f7; padding-bottom: 5px;">
              Üzenet / Leírás:
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #4a5568; background-color: #f7fafc; padding: 15px; border-radius: 6px; margin: 0;">
              ${description}
            </p>
          </div>

          <div style="margin-top: 30px; font-size: 11px; color: #a0aec0; text-align: center; border-top: 1px solid #edf2f7; padding-top: 15px;">
            Ezt az e-mailt a Szépít-Lak Kft. weboldalának ajánlatkérő rendszere küldte.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: err.message || 'Belső szerverhiba történt' });
  }
}
