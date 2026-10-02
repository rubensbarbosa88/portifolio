const { callPencil } = require('./pencil-bridge');
const path = require('path');
const fs = require('fs');
const os = require('os');

function getLatestCachedPreview() {
  const cacheDir = path.join(os.homedir(), '.pencil', 'previews');
  if (!fs.existsSync(cacheDir)) return null;

  const files = fs.readdirSync(cacheDir)
    .filter(f => f.endsWith('.png'))
    .map(f => {
      const fullPath = path.join(cacheDir, f);
      const stat = fs.statSync(fullPath);
      return { path: fullPath, mtime: stat.mtimeMs, size: stat.size };
    })
    .sort((a, b) => b.mtime - a.mtime);

  return files.length > 0 ? files[0] : null;
}

function copyToDestinations(sourceFile) {
  const primaryDest = path.join(__dirname, 'ux-portifolio-preview.png');
  const legacyDest = path.join(__dirname, 'portfolio-preview.png');

  fs.copyFileSync(sourceFile, primaryDest);
  fs.copyFileSync(sourceFile, legacyDest);

  console.log('✅ Preview exportado com sucesso:');
  console.log('   ->', primaryDest);
  console.log('   ->', legacyDest);
}

async function exportPreview() {
  const exportDir = path.join(__dirname, 'export-out');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  // Limpar arquivos .png anteriores de export-out
  for (const file of fs.readdirSync(exportDir)) {
    if (file.endsWith('.png')) {
      try { fs.unlinkSync(path.join(exportDir, file)); } catch (e) {}
    }
  }

  console.log('🔄 Conectando ao aplicativo Pencil para exportar o layout ao vivo...');

  const outDir = exportDir.replace(/\\/g, '/');
  const input = `
    const frameIds = Get(n => n.type === 'frame' ? n.id : undefined) || [];
    const targetId = frameIds.length > 0 ? frameIds[0] : 'bi8Au';
    Export([targetId], 'png', '${outDir}', { scale: 1 });
    Print('EXPORTED_TARGET:', targetId);
  `;

  let res = null;
  let connectionFailed = false;

  try {
    res = await callPencil('execute', { input });
    if (res && res.error) {
      connectionFailed = true;
    }
  } catch (err) {
    connectionFailed = true;
    res = { error: { message: err.message } };
  }

  if (connectionFailed) {
    console.warn('\n⚠️  Não foi possível conectar ao app desktop do Pencil.');
    console.warn('   Motivo:', res?.error?.message || 'Pencil Desktop não está respondendo.');
    console.log('\n💡 O aplicativo desktop Pencil (Pen.exe) precisa estar aberto com o documento para exportação direta.');

    // Verificar se existe um preview em cache recente
    const cached = getLatestCachedPreview();
    if (cached) {
      const fileDate = new Date(cached.mtime).toLocaleString();
      console.log(`\n📦 [FALLBACK INTELIGENTE] Encontrado preview recente gerado pelo Pencil:`);
      console.log(`   Arquivo: ${cached.path} (${fileDate}, ${(cached.size / 1024).toFixed(1)} KB)`);
      copyToDestinations(cached.path);
      return;
    } else {
      console.error('\n❌ Nenhum preview em cache encontrado. Por favor, abra o Pencil e tente novamente.');
      process.exit(1);
    }
  }

  // Se a conexão foi um sucesso, checar os arquivos gerados em export-out
  const exportedFiles = fs.readdirSync(exportDir).filter(f => f.endsWith('.png'));

  if (exportedFiles.length > 0) {
    const exportedFile = path.join(exportDir, exportedFiles[0]);
    copyToDestinations(exportedFile);
  } else {
    // Tenta fallback para o cache caso nada tenha sido gravado no export-out
    const cached = getLatestCachedPreview();
    if (cached) {
      console.log('⚠️ Nenhum arquivo gerado em export-out, utilizando preview do cache do Pencil.');
      copyToDestinations(cached.path);
    } else {
      console.error('❌ Falha ao encontrar arquivo exportado em:', exportDir);
      process.exit(1);
    }
  }
}

exportPreview().catch((err) => {
  console.error('Erro na execução do exportPreview:', err);
  process.exit(1);
});
