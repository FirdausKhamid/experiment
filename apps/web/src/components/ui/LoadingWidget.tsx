"use client";

type LoadingWidgetProps = {
  /** Optional message below the spinner */
  message?: string;
  /** Spinner size */
  size?: "sm" | "md" | "lg";
  /** Optional class for the wrapper */
  className?: string;
  /** When true, render as a full-screen overlay popup (centered, with backdrop) */
  popup?: boolean;
};

const sizeClass = {
  sm: "loading-widget-spinner--sm",
  md: "loading-widget-spinner--md",
  lg: "loading-widget-spinner--lg",
} as const;

export function LoadingWidget({
  message,
  size = "md",
  className = "",
  popup = false,
}: LoadingWidgetProps) {
  const widget = (
    <div
      className={className ? `loading-widget ${className}` : "loading-widget"}
      role="status"
      aria-label={message ?? "Loading"}
    >
      <div
        className={`loading-widget-spinner ${sizeClass[size]}`}
        aria-hidden
      />
      {message ? <p className="loading-widget-message">{message}</p> : null}
    </div>
  );

  if (popup) {
    return <div className="loading-popup">{widget}</div>;
  }

  return widget;
}
