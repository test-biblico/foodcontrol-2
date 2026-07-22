const fs = require('fs');
let html = fs.readFileSync('C:/Users/peter/foodcontrol-2/index.html', 'utf8');
const oldBlock = `  const medPed = parseMedida((item.cantidad || '') + ' ' + (item.unidad || ''));
  const esUnid = /^(unid|un|doc|docena)$/i.test((item.unidad || '').trim());

  let mejor = null, mejorCosto = Infinity, mejorPacks = 1;
  cands.forEach(p => {
    const medPack = parseMedida(p.nombre || p.producto);
    let packs;
    if (medPed && medPack && medPed.tipo === medPack.tipo) {
      packs = Math.max(1, Math.ceil(medPed.valor / medPack.valor));
    } else if (esUnid || !medPed) {
      packs = Math.max(1, Math.round(item.cantidad || 1));
    } else {
      packs = 1; // fallback: asumir que 1 pack cubre la medida pedida
    }`;
const newBlock = `  const esUnid = /^(unid|un|doc|docena)$/i.test((item.unidad || '').trim());

  let mejor = null, mejorCosto = Infinity, mejorPacks = 1;
  cands.forEach(p => {
    const medPack = parseMedida(p.nombre || p.producto);
    if (esUnid || !medPack) {
      // Cantidad por unidades: multiplicar por cantidad pedida.
      mejorPacks = Math.max(1, Math.round(item.cantidad || 1));
    } else {
      // Cantidad por medida: 1 pack es la unidad del comercio; el coste se suma sin forzar cobertura.
      mejorPacks = 1;
    }`;
if (!html.includes(oldBlock)) {
  console.log('NO_OLD_BLOCK');
  process.exit(1);
}
html = html.replace(oldBlock, newBlock);
fs.writeFileSync('C:/Users/peter/foodcontrol-2/index.html', html, 'utf8');
console.log('PATCHED');
