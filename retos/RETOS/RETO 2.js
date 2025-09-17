<script>
let inventario = ['escudo de bugs', 'guante codificador', 'compilador portatil', 'visor de errores'];
undefined
inventario.pop([3]);
'visor de errores'
inventario.pop([2]);
'compilador portatil' inventario.unshift('compilador portatil');
3
inventario.push('visor de errores');
4
console.log(inventario);
[
  'compilador portatil',
  'escudo de bugs',
  'guante codificador',
  'visor de errores'
]
undefined
 console.log(inventario[1]);
escudo de bugs
undefined

</script>