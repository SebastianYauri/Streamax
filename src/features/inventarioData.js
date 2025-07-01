// Modelo de Producto según tu base de datos
export const productos = [
  // Ejemplo de producto
  {
    Serie: 'A123',
    ID_Modelo: 1,
    ID_Categoria: 2,
    Estado: 'Nuevo',
  },
  // Agrega más productos aquí
];

// Modelo de Kardex según tu base de datos
export const kardex = [
  // Ejemplo de movimiento kardex
  {
    ID_Kardex: 1,
    Tipo: 'Ingreso',
    ID_Producto: 'A123',
    ID_Directorio: 1,
  },
  // Agrega más movimientos aquí
];
