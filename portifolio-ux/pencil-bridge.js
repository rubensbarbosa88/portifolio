const { spawn } = require('child_process');

function callPencil(toolName, toolArgs) {
  return new Promise((resolve, reject) => {
    const serverPath = 'C:\\Users\\ruben\\AppData\\Local\\Programs\\Pen\\resources\\app.asar.unpacked\\out\\mcp-server-windows-x64.exe';
    const p = spawn(serverPath, ['-app', 'desktop', '-enable_spawn_agents']);

    let result = null;
    let buffer = '';

    p.stdout.on('data', (d) => {
      buffer += d.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep last incomplete line

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line.trim());
          if (parsed.id === 2) {
            result = parsed;
          }
        } catch(e) {}
      }
    });

    p.stderr.on('data', (d) => {
      // process.stderr.write(d);
    });

    // 1. Initialize
    p.stdin.write(JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'antigravity', version: '1.0' }
      }
    }) + '\n');

    // 2. Call tool
    setTimeout(() => {
      p.stdin.write(JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: {
          name: toolName,
          arguments: toolArgs
        }
      }) + '\n');
    }, 1000);

    setTimeout(() => {
      p.kill();
      if (result) {
        resolve(result);
      } else {
        reject(new Error('Timeout or no result received from Pencil MCP'));
      }
    }, 15000);
  });
}

module.exports = { callPencil };

if (require.main === module) {
  const tool = process.argv[2] || 'get_app_state';
  const args = process.argv[3] ? JSON.parse(process.argv[3]) : {};
  callPencil(tool, args)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
