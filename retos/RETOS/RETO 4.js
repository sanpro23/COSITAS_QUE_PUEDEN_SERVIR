// Paso 1: Declaración de variables
let nivelAmenaza = 65; // Puedes cambiar este valor entre 1 y 100
let modoSigiloActivado = true; // true o false
let escudoActivado = false; // Inicialmente false

// Paso 2: Lógica condicional
if (nivelAmenaza >= 80) {
  escudoActivado = true;
  console.log("Amenaza crítica, escudo activado");
} else if (nivelAmenaza >= 50 && nivelAmenaza <= 79) {
  if (modoSigiloActivado) {
    console.log("Amenaza media, se mantiene en modo sigilo, no es necesario activar el escudo");
  } else {
    escudoActivado = true;
    console.log("Amenaza media, escudo activado");
  }
} else {
  if (modoSigiloActivado) {
    console.log("Amenaza baja, no hay peligro inmediato y se mantiene en modo sigilo");
  } else {
    console.log("Amenaza baja, no hay peligro inmediato");
  }
}

// Paso 3: Mostrar estado del escudo
console.log("¿Escudo activado?", escudoActivado);