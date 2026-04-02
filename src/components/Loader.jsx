/**
 * Loader.jsx
 * Animated typing indicator shown while waiting for AI response.
 */

import React from 'react';

export default function Loader() {
    return (
        <div className="flex items-start gap-3 animate-fade-in-up">
            {/* AI Avatar */}
            <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: 'var(--accent)', color: '#fff' }}
                aria-label="AI"
            >
                P
            </div>

            {/* Typing bubble */}
            <div
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm"
                style={{
                    background: 'var(--ai-bg)',
                    border: '1px solid var(--border)',
                }}
                aria-label="Pathfinder is typing"
                role="status"
            >
                <span className="bounce-dot" />
                <span className="bounce-dot" />
                <span className="bounce-dot" />
            </div>
        </div>
    );
}
