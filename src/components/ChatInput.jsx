/**
 * ChatInput.jsx
 * Message input at the bottom of the chat.
 */

import React, { useState, useRef, useEffect } from 'react';

/**
 * @param {{
 *   onSend: (text: string) => void,
 *   isLoading: boolean
 * }} props
 */
export default function ChatInput({ onSend, isLoading }) {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = Math.min(ta.scrollHeight, 140) + 'px';
    }, [value]);

    const canSend = value.trim().length > 0 && !isLoading;

    const handleSend = () => {
        if (!canSend) return;
        onSend(value.trim());
        setValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div
            className="p-3 md:p-4"
            style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-mid)' }}
        >
            <div
                className="flex items-end gap-2 rounded-2xl px-4 py-2 transition-all duration-200"
                style={{
                    background: 'var(--bg-card)',
                    border: '1.5px solid var(--border)',
                    boxShadow: value.trim() ? '0 0 14px 2px var(--accent-glow)' : 'none',
                }}
            >
                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    id="chat-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isLoading ? 'Pathfinder is thinking…' : 'Type your message… (Enter to send)'}
                    disabled={isLoading}
                    rows={1}
                    className="flex-1 resize-none bg-transparent outline-none text-sm leading-relaxed py-1"
                    style={{
                        color: 'var(--text-primary)',
                        caretColor: 'var(--accent)',
                        maxHeight: '140px',
                    }}
                    aria-label="Chat message input"
                />

                {/* Send Button */}
                <button
                    onClick={handleSend}
                    disabled={!canSend}
                    aria-label="Send message"
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                        background: canSend ? 'var(--accent)' : 'var(--border)',
                        color: canSend ? '#fff' : 'var(--text-muted)',
                        cursor: canSend ? 'pointer' : 'not-allowed',
                        transform: canSend ? 'scale(1)' : 'scale(0.95)',
                        boxShadow: canSend ? '0 4px 14px var(--accent-glow)' : 'none',
                    }}
                >
                    {/* Send icon (arrow) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                    </svg>
                </button>
            </div>

            <p className="text-center text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                For inquiries, please contact us via email at enquiry@srcw.ac.in
              or call us at +91 7373144766.
            </p>
        </div>
    );
}
