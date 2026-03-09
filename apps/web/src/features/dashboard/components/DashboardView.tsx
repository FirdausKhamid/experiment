"use client";

import Link from "next/link";

export function DashboardView() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-card-inner">
          <div className="dashboard-icon-wrapper">
            <svg className="dashboard-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="dashboard-title">Welcome to your Dashboard</h1>
          <p className="dashboard-subtitle">
            You have successfully logged in. This area is restricted and will contain your personal overview and settings.
          </p>
          <div className="dashboard-actions">
               <Link
                href="/login"
                className="btn-secondary"
              >
                Sign out
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
