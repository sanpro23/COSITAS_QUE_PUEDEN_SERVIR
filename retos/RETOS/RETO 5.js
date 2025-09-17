let devHero = {
    nombre: "super santos",
    nivel: 7,
    herramientas: ["casco conexion red", "lapiz laser", "cupula firewall"],
    configuracion: {
        modoOscuro: true,
        idioma: "español"
    }
};
devHero.experiencia = 1500;
devHero.nivel += 2;
devHero.herramientas.push("gafas wireshar");
devHero.configuracion.idioma = "ingles";
console.log(devHero.nombre);
console.log(devHero.herramientas[1]);
console.log(devHero.configuracion.idioma);
console.log(devHero);