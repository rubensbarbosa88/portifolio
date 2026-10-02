const { callPencil } = require('./pencil-bridge');
const path = require('path');
const fs = require('fs');

async function exportPreview() {
  const exportDir = path.join(__dirname, 'export-out');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  // Remove existing bi8Au.png if any to prevent write locks
  const targetFile = path.join(exportDir, 'bi8Au.png');
  if (fs.existsSync(targetFile)) {
    try { fs.unlinkSync(targetFile); } catch(e) {}
  }

  const outDir = exportDir.replace(/\\/g, '/');
  const input = `
    Export(["bi8Au"], "png", "${outDir}", { scale: 1 });
    Print("EXPORTED bi8Au to ${outDir}");
  `;
  const res = await callPencil('execute', { input });
  console.log(JSON.stringify(res, null, 2));

  // Copy to portfolio-preview.png
  const dest = path.join(__dirname, 'portfolio-preview.png');
  if (fs.existsSync(targetFile)) {
    fs.copyFileSync(targetFile, dest);
    console.log('Successfully copied preview to', dest);
  } else {
    console.warn('Target file not found at', targetFile);
  }
}

exportPreview().catch(console.error);
