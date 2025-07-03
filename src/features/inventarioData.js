// Mock de marcas
export const marcas = [
  { ID_Marca: 1, Nombre: 'Samsung' },
  { ID_Marca: 2, Nombre: 'Apple' },
];

// Mock de modelos (cada uno con ID_Marca)
export const modelos = [
  { ID_Modelo: 1, Descripcion: 'Galaxy S21', ID_Marca: 1 },
  { ID_Modelo: 2, Descripcion: 'iPhone 13', ID_Marca: 2 },
];

// Mock de categorías
export const categorias = [
  { ID_Categoria: 1, Nombre: 'Smartphone' },
  { ID_Categoria: 2, Nombre: 'Tablet' },
];

// TODO: Reemplazar estos datos mock por consultas a la API cuando el backend esté disponible
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

// TODO: Reemplazar estos datos mock por consultas a la API cuando el backend esté disponible
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

// Mock de accesorios
export const accesorios = [
  { ID_Accesorio: 1, Nombre: 'Cable USB', ID_Categoria: 1, Descripcion: 'Cable de carga', Cantidad: 10 },
  { ID_Accesorio: 2, Nombre: 'Cargador', ID_Categoria: 1, Descripcion: 'Cargador rápido', Cantidad: 5 },
];

// Mock de kardex de accesorios
export const kardexAccesorios = [
  { ID_Kardex: 1, ID_Accesorio: 1, Cantidad: 5, Fecha: '2025-07-01', ID_Usuario: 1, ID_Directorio: 1 },
  { ID_Kardex: 2, ID_Accesorio: 2, Cantidad: 2, Fecha: '2025-07-02', ID_Usuario: 2, ID_Directorio: 1 },
];
