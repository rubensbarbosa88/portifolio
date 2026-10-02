const { callPencil } = require('./pencil-bridge');

async function main() {
  const input = `
    const root = Get("bi8Au", {depth: 1});
    Print("CHILDREN COUNT:", root.children ? root.children.length : 0);
    if (root.children) {
      for (const c of root.children) {
        Print("CHILD:", c.name, c.id, c.type, c.y, c.height);
      }
    }
  `;
  const res = await callPencil('execute', { input });
  console.log(res.result.content[0].text);
}

main().catch(console.error);
