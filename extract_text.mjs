import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

async function extractAllPdfs() {
    const dataDir = 'e:/pathfinder/pathfinder/src/data/';
    const outputFilePath = path.join(dataDir, 'knowledge_base.json');

    try {
        const files = fs.readdirSync(dataDir).filter(file => file.toLowerCase().endsWith('.pdf'));
        console.log(`Found ${files.length} PDF files:`, files);

        let allPages = [];
        let totalPageCount = 0;

        for (const file of files) {
            console.log(`Processing: ${file}...`);
            const filePath = path.join(dataDir, file);
            const dataBuffer = fs.readFileSync(filePath);

            const parser = new PDFParse({ data: dataBuffer });
            const data = await parser.getText();

            // Add identifying info to each page
            const pagesWithSource = data.pages.map(page => ({
                ...page,
                source: file,
                globalNum: totalPageCount + page.num
            }));

            allPages = allPages.concat(pagesWithSource);
            totalPageCount += data.total;

            await parser.destroy();
        }

        const output = {
            lastUpdated: new Date().toISOString(),
            totalFiles: files.length,
            totalPageCount: totalPageCount,
            pages: allPages
        };

        fs.writeFileSync(outputFilePath, JSON.stringify(output, null, 2));
        console.log(`Knowledge base successfully updated with ${files.length} files at ${outputFilePath}`);

    } catch (error) {
        console.error('Error during batch extraction:', error);
    }
}

extractAllPdfs();
