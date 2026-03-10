"use client";

import type { ReactNode } from "react";

type SideModalProps = {
  /** Control visibility of the side modal. */
  isOpen: boolean;
  /** Optional title rendered in the modal header. */
  title?: ReactNode;
  /** Optional description text under the title. */
  description?: ReactNode;
  /** Called when the user closes the modal (via close button or backdrop). */
  onClose: () => void;
  /** Optional footer area (e.g. buttons). */
  footer?: ReactNode;
  /** Main body content of the modal (e.g. form or FormBuilder). */
  children?: ReactNode;
};

export function SideModal({
  isOpen,
  title,
  description,
  onClose,
  footer,
  children,
}: SideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="side-modal-overlay">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="side-modal-backdrop"
      />
      <aside className="side-modal-panel">
        <div className="side-modal-content">
          <Header title={title} description={description} onClose={onClose} />
          <div className="side-modal-body">{children}</div>
          {footer ? <div className="side-modal-footer">{footer}</div> : null}
        </div>
      </aside>
    </div>
  );
}

type HeaderProps = {
  title?: ReactNode;
  description?: ReactNode;
  onClose: () => void;
};

function Header({ title, description, onClose }: HeaderProps) {
  return (
    <div className="side-modal-header">
      <div>
        {title ? <h2 className="side-modal-title">{title}</h2> : null}
        {description ? (
          <p className="side-modal-description">{description}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="side-modal-close-button"
        aria-label="Close panel"
      >
        <span className="sr-only">Close</span>
        <svg
          className="side-modal-close-icon"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
