const fs = require('fs');
const pdf = require('pdf-parse');

async function extractText() {
    try {
        const dataBuffer = fs.readFileSync('e:/pathfinder/pathfinder/src/data/DEPARTMENT OF COMPUTER SCIENCE.pdf');
        const data = await pdf(dataBuffer);

        const output = {
            fileName: 'DEPARTMENT OF COMPUTER SCIENCE.pdf',
            text: data.text,
            pageCount: data.numpages,
            info: data.info
        };

        fs.writeFileSync('e:/pathfinder/pathfinder/src/data/knowledge_base.json', JSON.stringify(output, null, 2));
        console.log('Text extraction successful! Knowledge base created at src/data/knowledge_base.json');
    } catch (error) {
        console.error('Error extracting text:', error);
    }
}

extractText();
