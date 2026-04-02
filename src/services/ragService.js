/**
 * ragService.js
 * Handles retrieval of relevant context from the local knowledge base.
 */

import knowledgeBase from '../data/knowledge_base.json';

export const ragService = {
    /**
     * Simple keyword-based retrieval.
     * Searches through the knowledge base and returns top matching snippets.
     */
    retrieve: (query, topK = 3) => {
        if (!query || !knowledgeBase || !knowledgeBase.pages) return "";

        const searchTerms = query.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(term => term.length > 2); // filter short words

        if (searchTerms.length === 0) return "";

        // Score each page based on keyword matches
        const scoredPages = knowledgeBase.pages.map(page => {
            let score = 0;
            const text = page.text.toLowerCase();

            searchTerms.forEach(term => {
                if (text.includes(term)) {
                    // Count Occurrences
                    const count = text.split(term).length - 1;
                    score += count;
                }
            });

            return { ...page, score };
        });

        // Sort by score and take top K
        const topPages = scoredPages
            .filter(p => p.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);

        if (topPages.length === 0) return "";

        // Combine top snippets
        const context = topPages
            .map(p => `[Source Page ${p.num}]:\n${p.text}`)
            .join('\n\n---\n\n');

        return context;
    }
};
