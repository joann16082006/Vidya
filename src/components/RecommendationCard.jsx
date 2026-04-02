/**
 * RecommendationCard.jsx
 * Card-style display for a single course/career recommendation.
 */

import React from 'react';

/**
 * @param {{
 *   title: string,
 *   reason: string,
 *   careers: string[],
 *   duration: string,
 *   entrance?: string
 * }} props
 */
export default function RecommendationCard({ title, reason, careers, duration, entrance }) {
    return (
        <div className="rec-card animate-fade-in-up">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-2">
                <h3
                    className="font-semibold text-sm leading-snug"
                    style={{ color: 'var(--accent-soft)' }}
                >
                    🎓 {title}
                </h3>
                {duration && (
                    <span
                        className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                            background: 'rgba(74, 124, 89, 0.15)',
                            color: 'var(--accent-soft)',
                            border: '1px solid rgba(74, 124, 89, 0.25)',
                        }}
                    >
                        {duration}
                    </span>
                )}
            </div>

            {/* Why it fits */}
            {reason && (
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                    {reason}
                </p>
            )}

            {/* Career paths */}
            {careers && careers.length > 0 && (
                <div className="mb-2">
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        Career Paths
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {careers.map((c, i) => (
                            <span
                                key={i}
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{
                                    background: '#f9fafb',
                                    color: 'var(--text-muted)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Entrance exam */}
            {entrance && (
                <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--accent-soft)' }}>
                        Entrance:{' '}
                    </span>
                    {entrance}
                </p>
            )}
        </div>
    );
}
