/**
 * ChatContainer.jsx
 * Main orchestrator: handles streaming conversation flow and 
 * the 8-step college admission workflow including database storage.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessageStream } from '../services/apiService';
import { dbService } from '../services/dbService';
import { emailService } from '../services/emailService';
import { ragService } from '../services/ragService';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Loader from './Loader';

const INITIAL_MESSAGE = {
    role: 'assistant',
    content: "Hi, I am Vidya from Sri Ramakrishna College of Arts and Science for Women. Welcome!\nI’m here to help you with any information about our college. You can also contact me directly at +91 7373144766.\n📱 Follow us on Instagram for the latest updates and campus highlights:\n🔗 https://www.instagram.com/srcwcbeofficial\n\nBefore we continue, may I know your details? Please share your Name and at least one contact detail (Phone Number or Email ID) so I can assist you better. 😊",
};

export default function ChatContainer() {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [streamState, setStreamState] = useState(null);
    const [error, setError] = useState(null);
    const bottomRef = useRef(null);
    const streamingTextRef = useRef('');

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamState]);

    const handleSend = useCallback(
        async (text) => {
            if (!text || streamState !== null) return;
            setError(null);
            streamingTextRef.current = '';

            const userMsg = { role: 'user', content: text };
            const historyWithUser = [...messages, userMsg];

            setMessages([
                ...historyWithUser,
                { role: 'assistant', content: '' },
            ]);
            setStreamState('waiting');

            try {
                const apiHistory = historyWithUser.map((m) => ({
                    role: m.role === 'assistant' ? 'assistant' : 'user',
                    content: m.content,
                }));

                // RAG: Retrieve relevant context from the PDF knowledge base
                const context = ragService.retrieve(text);

                const fullResponse = await sendMessageStream(apiHistory, (chunk) => {
                    streamingTextRef.current += chunk;
                    const accumulated = streamingTextRef.current;

                    setStreamState('streaming');
                    setMessages((prev) => {
                        const updated = [...prev];
                        updated[updated.length - 1] = {
                            role: 'assistant',
                            content: accumulated,
                        };
                        return updated;
                    });
                }, context); // Pass retrieved context here

                // POST-PROCESSING: Check for Database Submission Tag
                const submitMatch = fullResponse.match(/\[SUBMIT_APP_JSON:\s*(\{.*?\})\s*\]/s);

                if (submitMatch) {
                    try {
                        const appData = JSON.parse(submitMatch[1]);
                        const appId = dbService.saveApplication(appData);

                        // 1. Send Automatic Emails
                        const fullAppData = { ...appData, appId };
                        await emailService.sendAdmissionEmails(fullAppData);

                        // 2. Update UI: replace [GENERATED_ID] and show success message
                        setMessages((prev) => {
                            const updated = [...prev];
                            const lastMsg = updated[updated.length - 1];
                            lastMsg.content = lastMsg.content
                                .replace(submitMatch[0], '')
                                .replace('[GENERATED_ID]', appId)
                                .trim();

                            // Append the specific success message requested
                            lastMsg.content += "\n\n**Application submitted successfully.**";
                            return updated;
                        });
                    } catch (dbErr) {
                        setError(dbErr.message || 'Submission failed.');
                    }
                }

                setStreamState(null);
            } catch (err) {
                setError(err.message || 'Something went wrong. Please try again.');
                setMessages(messages);
                setStreamState(null);
            }
        },
        [messages, streamState]
    );

    const isLoading = streamState !== null;
    const showDots = streamState === 'waiting';

    return (
        <div className="flex flex-col h-full w-full" style={{ background: 'var(--bg-deep)' }}>
            <header
                className="flex items-center gap-3 px-4 py-3 md:px-6"
                style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-mid)' }}
            >
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-black shadow-md"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-soft))', color: '#fff' }}
                >
                    V
                </div>
                <div>
                    <h1 className="font-bold text-sm leading-none" style={{ color: 'var(--text-primary)' }}>
                        Vidya
                    </h1>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        Sri Ramakrishna College of Arts and Science for Women Representative · Active
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-soft)', boxShadow: '0 0 6px var(--accent-glow)' }} />
                    <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
                        {isLoading ? 'Processing…' : 'Support Online'}
                    </span>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-3 py-5 md:px-6 space-y-4">
                {messages.map((msg, i) => {
                    if (msg.role === 'assistant' && msg.content === '' && showDots) return null;
                    return <ChatMessage key={i} message={msg} />;
                })}
                {showDots && <Loader />}
                {error && (
                    <div
                        className="text-xs px-4 py-3 rounded-xl animate-fade-in-up"
                        style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                        role="alert"
                    >
                        ⚠️ {error}
                    </div>
                )}
                <div ref={bottomRef} />
            </main>

            <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
    );
}
