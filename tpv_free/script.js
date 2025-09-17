function checkCashRegister(price, cash, cid) {
  const DENOMINACIONES = [
    ["ONE HUNDRED", 100.0],
    ["TWENTY", 20.0],
    ["TEN", 10.0],
    ["FIVE", 5.0],
    ["ONE", 1.0],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
  ];
  let cambio = parseFloat((cash - price).toFixed(2));
  let totalEnCaja = parseFloat(cid.reduce((sum, [, amount]) => sum + amount, 0).toFixed(2));
  let cambioEntregado = [];

  if (cambio > totalEnCaja) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (cambio === totalEnCaja) {
    return { status: "CLOSED", change: cid };
  }

  let cajaReversa = cid.slice().reverse();

  for (let i = 0; i < DENOMINACIONES.length; i++) {
    let nombre = DENOMINACIONES[i][0];
    let valor = DENOMINACIONES[i][1];
    let cantidadDisponible = cajaReversa[i][1];
    let cantidadUsada = 0;

    while (cambio >= valor && cantidadDisponible >= valor) {
      cambio -= valor;
      cambio = parseFloat(cambio.toFixed(2));
      cantidadDisponible -= valor;
      cantidadUsada += valor;
    }

    if (cantidadUsada > 0) {
      cambioEntregado.push([nombre, cantidadUsada]);
    }
  }

  if (cambio > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: cambioEntregado };
}