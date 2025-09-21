
  function checkCashRegister(price, cash, cid) {
    const DENOMINACIONES = [
      ["QUINIENTOS EUROS", 500],
      ["DOSCIENTOS EUROS", 200],
      ["CIEN EUROS", 100],
      ["CINCUENTA EUROS", 50],
      ["VEINTE EUROS", 20],
      ["DIEZ EUROS", 10],
      ["CINCO EUROS", 5],
      ["UNO EURO", 1],
      ["CINCUENTA CENTIMOS", 0.5],
      ["VEINTE CENTIMOS", 0.2],
      ["DIEZ CENTIMOS", 0.1],
      ["CINCO CENTIMOS", 0.05],
      ["DOS CENTIMOS", 0.02],
      ["UN CENTIMO", 0.01]
    ];

    let cambio = Math.round((cash - price) * 100);
    let totalEnCaja = Math.round(cid.reduce((sum, [, amount]) => sum + amount, 0) * 100);
    let cambioEntregado = [];

    if (cambio > totalEnCaja) return { status: "INSUFFICIENT_FUNDS", change: [] };
    if (cambio === totalEnCaja) return { status: "CLOSED", change: cid };

    const cajaMap = new Map(cid.map(([nombre, cantidad]) => [nombre, Math.round(cantidad * 100)]));

    for (const [nombre, valor] of DENOMINACIONES) {
      let cantidadDisponible = cajaMap.get(nombre) || 0;
      let cantidadUsada = 0;
      let valorCentimos = Math.round(valor * 100);

      while (cambio >= valorCentimos && cantidadDisponible >= valorCentimos) {
        cambio -= valorCentimos;
        cantidadDisponible -= valorCentimos;
        cantidadUsada += valorCentimos;
      }

      if (cantidadUsada > 0) {
        cambioEntregado.push([nombre, cantidadUsada / 100]);
      }
    }

    if (cambio > 0) return { status: "INSUFFICIENT_FUNDS", change: [] };
    return { status: "OPEN", change: cambioEntregado };
  }

  document.getElementById('cash-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const price = parseFloat(document.getElementById('price').value);
    const cash = parseFloat(document.getElementById('cash').value);
    let cid;

    try {
      cid = JSON.parse(document.getElementById('cid').value);
    } catch (error) {
      document.getElementById('resultado').innerText = "❌ Error en el formato JSON.";
      return;
    }

    const resultado = checkCashRegister(price, cash, cid);
    const totalCambio = resultado.change.reduce((sum, [, cantidad]) => sum + cantidad, 0).toFixed(2);

    renderResultado(resultado.status, totalCambio);
    renderTabla(resultado.change);
  });

  function renderResultado(status, totalCambio) {
    const resultado = document.getElementById('resultado');
    resultado.innerText = `Estado: ${status.replace("_", " ")}\nCambio total: ${totalCambio} €`;
    resultado.className = "estado " + status.toLowerCase();
  }

  function renderTabla(change) {
    const tabla = document.getElementById('tabla-cambio');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = "";

    if (change.length > 0) {
      change.forEach(([denominacion, cantidad]) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${denominacion}</td><td>${cantidad.toFixed(2)} €</td>`;
        tbody.appendChild(fila);
      });
      tabla.classList.remove("hidden");
    } else {
      tabla.classList.add("hidden");
    }
  }



