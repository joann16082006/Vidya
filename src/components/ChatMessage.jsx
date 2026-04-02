/**
 * ChatMessage.jsx
 * Renders a single chat bubble for either the user or the AI.
 */

import React, { useMemo } from 'react';
import RecommendationCard from './RecommendationCard';

/** Simple markdown-like formatter: bold, bullets */
function formatText(text) {
    // Hide internal system tags like [SUBMIT_APP_JSON: ...] from the UI
    const cleanText = text.replace(/\[SUBMIT_APP_JSON:.*?\]/gs, '').trim();
    if (!cleanText) return null;

    const lines = cleanText.split('\n');
    return lines.map((line, i) => {
        // Bold **text**
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const formatted = parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} style={{ color: 'var(--accent-soft)' }}>{part}</strong> : part
        );

        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            return (
                <li key={i} className="ml-4 list-disc leading-relaxed">
                    {formatted}
                </li>
            );
        }
        if (line.startsWith('# ')) {
            return (
                <p key={i} className="font-semibold mt-2 mb-1" style={{ color: 'var(--accent-soft)', fontSize: '1.1em' }}>
                    {line.slice(2)}
                </p>
            );
        }
        if (line.startsWith('## ') || line.startsWith('### ')) {
            return (
                <p key={i} className="font-medium mt-2" style={{ color: 'var(--text-primary)' }}>
                    {line.replace(/^#{2,3}\s/, '')}
                </p>
            );
        }
        if (line.trim() === '') return <div key={i} className="h-2" />;
        return <p key={i} className="leading-relaxed">{formatted}</p>;
    });
}

/**
 * Parse AI message text to extract structured recommendation blocks.
 */
function parseRecommendations(text) {
    // Look for patterns like "* **Course Name**" or "1. **Course Name**"
    const coursePattern = /(?:^|\n)(?:\d+\.|\*|-)\s*\*\*([^*]+)\*\*(?:[:\s-]*)([\s\S]*?)(?=\n(?:\d+\.|\*|-)\s*\*\*|$)/g;
    const matches = [...text.matchAll(coursePattern)];

    // We only want to show cards if there are multiple recommendations
    if (matches.length < 2) return null;

    return matches.slice(0, 6).map((m) => {
        const title = m[1].trim();
        const body = m[2].trim();

        // Try to extract some structured info from the body
        const durationLine = body.match(/duration[^:\n]*:\s*([^\n]+)/i);
        const careerLine = body.match(/career[s]?[^:\n]*:\s*([^\n]+)/i);

        return {
            title,
            reason: body.split('\n')[0].replace(/^[-\s*]+/, ''), // First line as summary
            careers: careerLine ? careerLine[1].split(/[,;]/).map(s => s.trim()) : [],
            duration: durationLine ? durationLine[1].trim() : '',
        };
    });
}

/**
 * @param {{ message: { role: string, content: string } }} props
 */
export default function ChatMessage({ message }) {
    const isUser = message.role === 'user';

    const recommendations = useMemo(
        () => (!isUser ? parseRecommendations(message.content) : null),
        [isUser, message.content]
    );

    if (isUser) {
        return (
            <div className="flex items-end justify-end gap-2 animate-fade-in-up">
                <div
                    className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed shadow-md"
                    style={{
                        background: 'var(--user-bg)',
                        color: '#fff',
                    }}
                >
                    {message.content}
                </div>
                <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                    You
                </div>
            </div>
        );
    }

    const formattedContent = formatText(message.content);
    if (!formattedContent && !recommendations) return null;

    return (
        <div className="flex items-start gap-3 animate-fade-in-up">
            <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md"
                style={{ background: 'var(--accent)', color: '#fff' }}
            >
                V
            </div>

            <div
                className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-sm"
                style={{
                    background: 'var(--ai-bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                }}
            >
                {recommendations ? (
                    <>
                        <div className="mb-3">{formattedContent}</div>
                        {recommendations.map((rec, i) => (
                            <RecommendationCard key={i} {...rec} />
                        ))}
                    </>
                ) : (
                    <div className="space-y-0.5">{formattedContent}</div>
                )}
            </div>
        </div>
    );
}

