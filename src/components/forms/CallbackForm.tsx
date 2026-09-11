import React, { useState } from 'react';
import styles from './CallbackForm.module.css';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
  name: string;
  phone: string;
  message: string;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  privacy?: string;
}

interface CallbackFormProps {
  onSuccess?: () => void;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'A névmegadása kötelező.';
  if (!data.phone.trim()) {
    errors.phone = 'A telefonszám megadása kötelező.';
  } else if (!/^[\d\s\+\-\(\)]{7,}$/.test(data.phone.trim())) {
    errors.phone = 'Kérlek adj meg érvényes telefonszámot.';
  }
  if (!data.privacy) errors.privacy = 'Az adatkezelési tájékoztató elfogadása kötelező.';
  return errors;
}

export const CallbackForm: React.FC<CallbackFormProps> = ({ onSuccess }) => {
  const { track } = useConversionEvent();
  const [data, setData] = useState<FormData>({ name: '', phone: '', message: '', privacy: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!started) {
      track(CONVERSION_EVENTS.CONTACT_FORM_START, { form: 'callback' });
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

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: 'visszahivas@szepitlak.hu',
          location: 'Visszahívás kérés (Weboldal)',
          description: data.message ? `[VISSZAHÍVÁS KÉRÉS] ${data.message}` : '[VISSZAHÍVÁS KÉRÉS] Ügyfél visszahívást kért a weboldalon.',
          turnstileToken: 'bypass-on-widget-error',
        }),
      });

      const result = await response.json().catch(() => ({ error: 'Szerver hiba történt.' }));
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Az elküldés nem sikerült.');
      }

      track(CONVERSION_EVENTS.CALLBACK_FORM_TEST_SUBMIT, {
        status: 'success',
      });
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'generate_lead',
          form_name: 'callback_form',
        });
      }
      setSubmitted(true);
      if (onSuccess) setTimeout(onSuccess, 2500);
    } catch (err: any) {
      console.error('Callback Submit Error:', err);
      setSubmitError(err.message || 'Hiba történt a visszahívás kérése során.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.success} role="alert">
        <CheckCircle size={32} className={styles.successIcon} />
        <p className={styles.successTitle}>Köszönjük a megkeresést!</p>
        <p className={styles.successNote}>
          Hamarosan felvesszük Önnel a kapcsolatot a megadott telefonszámon.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Név */}
      <div className={styles.field}>
        <label htmlFor="cb-name" className={styles.label}>
          Név <span aria-hidden="true">*</span>
        </label>
        <input
          id="cb-name"
          type="text"
          autoComplete="name"
          value={data.name}
          onChange={handleChange('name')}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cb-name-err' : undefined}
          placeholder="Teljes neved"
        />
        {errors.name && (
          <p id="cb-name-err" className={styles.error} role="alert">
            <AlertCircle size={13} /> {errors.name}
          </p>
        )}
      </div>

      {/* Telefon */}
      <div className={styles.field}>
        <label htmlFor="cb-phone" className={styles.label}>
          Telefonszám <span aria-hidden="true">*</span>
        </label>
        <input
          id="cb-phone"
          type="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={handleChange('phone')}
          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'cb-phone-err' : undefined}
          placeholder="+36 30 ..."
        />
        {errors.phone && (
          <p id="cb-phone-err" className={styles.error} role="alert">
            <AlertCircle size={13} /> {errors.phone}
          </p>
        )}
      </div>

      {/* Üzenet */}
      <div className={styles.field}>
        <label htmlFor="cb-message" className={styles.label}>
          Rövid üzenet <span className={styles.optional}>(nem kötelező)</span>
        </label>
        <textarea
          id="cb-message"
          rows={3}
          value={data.message}
          onChange={handleChange('message')}
          className={styles.textarea}
          placeholder="Pl. miben segíthetünk..."
        />
      </div>

      {/* Adatkezelés */}
      <div className={styles.checkboxField}>
        <input
          id="cb-privacy"
          type="checkbox"
          checked={data.privacy}
          onChange={handleChange('privacy')}
          className={styles.checkbox}
          aria-required="true"
          aria-invalid={!!errors.privacy}
          aria-describedby={errors.privacy ? 'cb-privacy-err' : undefined}
        />
        <label htmlFor="cb-privacy" className={styles.checkboxLabel}>
          Elfogadom az{' '}
          <Link to="/adatkezelesi-tajekoztato" target="_blank" className={styles.link}>
            adatkezelési tájékoztatót
          </Link>
          . <span aria-hidden="true">*</span>
        </label>
      </div>
      {errors.privacy && (
        <p id="cb-privacy-err" className={styles.error} role="alert">
          <AlertCircle size={13} /> {errors.privacy}
        </p>
      )}

      {submitError && (
        <p className={styles.error} role="alert" style={{ marginTop: '0.5rem' }}>
          <AlertCircle size={13} /> {submitError}
        </p>
      )}

      <button
        type="submit"
        className={`btn btn--primary ${styles.submit}`}
        disabled={loading}
      >
        {loading ? 'Küldés...' : 'Visszahívást kérek'}
      </button>
    </form>
  );
};
