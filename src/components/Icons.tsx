/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const CrossIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {/* Ornate Christian Cross */}
    <path d="M11 2h2c.55 0 1 .45 1 1v4h4c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-4v10c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1V11H6c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h4V3c0-.55.45-1 1-1z" />
    <circle cx="12" cy="9.5" r="1.2" fill="#fff" opacity="0.4" />
  </svg>
);

export const BibleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
    <path d="M11 5v6" />
    <path d="M9 7h4" />
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
  </svg>
);

export const DoveIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 8a6 6 0 0 0-6-6 6 6 0 0 0-4.5 2L7 7l-4 2 2 4 4 1 2 5 3-2 1-5a6 6 0 0 0 5-4z" />
    <path d="M15 4c0 2 1.5 3.5 3.5 3.5" />
    <circle cx="18" cy="5" r="0.7" fill="currentColor" />
  </svg>
);

export const CandleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 21h6v-9H9v9z" />
    <path d="M12 12V9" />
    <path d="M12 3c-1.5 2-2 3.5-2 4.5 0 1.1.9 2 2 2s2-.9 2-2c0-1-0.5-2.5-2-4.5z" fill="currentColor" opacity="0.3" />
    <path d="M7 21h10" />
  </svg>
);

export const OliveBranchIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 21c7-2 13-8 16-16" />
    <path d="M7 16c-1-3 0-5 2-6s4 0 4 3-2 4-6 3z" />
    <path d="M13 11c-1-3 1-5 3-5s3 2 3 4-2 3-6 1z" />
    <path d="M16 6c0-2 2-3 4-3s2 2 1 4-2 1-5-1z" />
  </svg>
);

export const RosaryBeadsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="6" cy="7" r="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="18" cy="7" r="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="20" cy="13" r="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="16" cy="18" r="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="8" cy="18" r="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="4" cy="13" r="2" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 18v4" />
    <path d="M10 20h4" />
  </svg>
);
