const { callPencil } = require('./pencil-bridge');

async function main() {
  const input = `
    const root = Get("bi8Au", {depth: 2});
    Print("ROOT:", JSON.stringify(root));
  `;
  const res = await callPencil('execute', { input });
  console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);
