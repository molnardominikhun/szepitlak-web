import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  description: string;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  description?: string;
  privacy?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'A névmegadása kötelező.';
  if (!data.phone.trim()) {
    errors.phone = 'A telefonszám megadása kötelező.';
  } else if (!/^[\d\s\+\-\(\)]{7,}$/.test(data.phone.trim())) {
    errors.phone = 'Kérlek adj meg érvényes telefonszámot.';
  }
  if (!data.email.trim()) {
    errors.email = 'Az e-mail-cím megadása kötelező.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Kérlek adj meg érvényes e-mail-címet.';
  }
  if (!data.location.trim()) errors.location = 'A helyszín / település megadása kötelező.';
  if (!data.description.trim()) errors.description = 'Kérjük, röviden írd le, miben segíthetünk.';
  if (!data.privacy) errors.privacy = 'Az adatkezelési tájékoztató elfogadása kötelező.';
  return errors;
}

const EMPTY: FormData = { name: '', phone: '', email: '', location: '', description: '', privacy: false };

export const ContactForm: React.FC = () => {
  const { track } = useConversionEvent();
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!started) {
      track(CONVERSION_EVENTS.CONTACT_FORM_START, { form: 'contact' });
      setStarted(true);
    }
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Görgetés az első hibáig
      const firstError = document.querySelector('[aria-invalid="true"]');
      (firstError as HTMLElement)?.focus();
      return;
    }
    setLoading(true);
    // TESZTMÓD
    setTimeout(() => {
      track(CONVERSION_EVENTS.CONTACT_FORM_TEST_SUBMIT, {
        name: data.name,
        location: data.location,
      });
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <div className={styles.success} role="alert">
        <CheckCircle size={40} className={styles.successIcon} />
        <h2 className={styles.successTitle}>Köszönjük a megkeresést!</h2>
        <p className={styles.successNote}>
          Ez jelenleg egy tesztbeküldés, ezért az üzenet nem került
          továbbításra.
        </p>
      </div>
    );
  }

  const field = (id: keyof FormData, label: string, required = true, optional = false) => (
    <div className={styles.field}>
      <label htmlFor={`cf-${id}`} className={styles.label}>
        {label}{' '}
        {optional && <span className={styles.optional}>(ajánlott)</span>}
        {required && <span aria-hidden="true">*</span>}
      </label>
    </div>
  );
  void field;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Név */}
      <div className={styles.field}>
        <label htmlFor="cf-name" className={styles.label}>Név <span aria-hidden="true">*</span></label>
        <input id="cf-name" type="text" autoComplete="name" value={data.name} onChange={handleChange('name')}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined}
          placeholder="Teljes neved" />
        {errors.name && <p id="cf-name-err" className={styles.error} role="alert"><AlertCircle size={13} /> {errors.name}</p>}
      </div>

      {/* Telefon + Email sor */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-phone" className={styles.label}>Telefonszám <span aria-hidden="true">*</span></label>
          <input id="cf-phone" type="tel" autoComplete="tel" value={data.phone} onChange={handleChange('phone')}
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            aria-required="true" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'cf-phone-err' : undefined}
            placeholder="+36 30 ..." />
          {errors.phone && <p id="cf-phone-err" className={styles.error} role="alert"><AlertCircle size={13} /> {errors.phone}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-email" className={styles.label}>E-mail-cím <span aria-hidden="true">*</span></label>
          <input id="cf-email" type="email" autoComplete="email" value={data.email} onChange={handleChange('email')}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined}
            placeholder="nev@example.hu" />
          {errors.email && <p id="cf-email-err" className={styles.error} role="alert"><AlertCircle size={13} /> {errors.email}</p>}
        </div>
      </div>

      {/* Helyszín */}
      <div className={styles.field}>
        <label htmlFor="cf-location" className={styles.label}>Helyszín / település <span aria-hidden="true">*</span></label>
        <input id="cf-location" type="text" autoComplete="address-level2" value={data.location} onChange={handleChange('location')}
          className={`${styles.input} ${errors.location ? styles.inputError : ''}`}
          aria-required="true" aria-invalid={!!errors.location} aria-describedby={errors.location ? 'cf-location-err' : undefined}
          placeholder="pl. Tatabánya" />
        {errors.location && <p id="cf-location-err" className={styles.error} role="alert"><AlertCircle size={13} /> {errors.location}</p>}
      </div>

      {/* Leírás */}
      <div className={styles.field}>
        <label htmlFor="cf-description" className={styles.label}>
          Rövid leírás vagy megjegyzés <span aria-hidden="true">*</span>
        </label>
        <textarea id="cf-description" rows={5} value={data.description} onChange={handleChange('description')}
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
          aria-required="true" aria-invalid={!!errors.description} aria-describedby={errors.description ? 'cf-desc-err' : undefined}
          placeholder="Írd le röviden, milyen megoldást keresel, hány ablakot, ajtót érint a munka stb." />
        {errors.description && <p id="cf-desc-err" className={styles.error} role="alert"><AlertCircle size={13} /> {errors.description}</p>}
      </div>

      {/* Adatkezelés */}
      <div className={styles.checkboxField}>
        <input id="cf-privacy" type="checkbox" checked={data.privacy} onChange={handleChange('privacy')}
          className={styles.checkbox} aria-required="true" aria-invalid={!!errors.privacy}
          aria-describedby={errors.privacy ? 'cf-privacy-err' : undefined} />
        <label htmlFor="cf-privacy" className={styles.checkboxLabel}>
          Elfogadom az{' '}
          <Link to="/adatkezelesi-tajekoztato" target="_blank" className={styles.privacyLink}>
            adatkezelési tájékoztatót
          </Link>. <span aria-hidden="true">*</span>
        </label>
      </div>
      {errors.privacy && <p id="cf-privacy-err" className={styles.error} role="alert"><AlertCircle size={13} /> {errors.privacy}</p>}

      <button type="submit" className={`btn btn--primary ${styles.submit}`} disabled={loading}>
        {loading ? 'Küldés...' : 'Ajánlatot kérek'}
      </button>

      <p className={styles.note}>
        * Kötelező mező. Egy munkanapon belül felvesszük veled a kapcsolatot.
      </p>
    </form>
  );
};
