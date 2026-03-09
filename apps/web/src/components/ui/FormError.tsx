import { Failure } from "@/utils/error";

interface FormErrorProps {
  error: Failure | null;
}

export function FormError({ error }: FormErrorProps) {
  if (!error) return null;

  return (
    <div className="form-error-alert">
      <div className="form-error-alert-inner">
        <div className="form-error-icon-wrapper">
          <svg className="form-error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="form-error-content">
          <p className="form-error-text">
            {Array.isArray(error.message) ? error.message[0] : error.message}
          </p>
        </div>
      </div>
    </div>
  );
}
