export interface Articulo {
  id: string;
  Codigo: string;
  Categoria: string;
  Telefono: string;
  Descripcion: string;
  Precio: number;
  Apartado: boolean;
  Vendido: boolean;
  Notas_comprador: string;
  Numero_comprador: string;
  Habitacion_comprador: string;
  Imagenes: string[];
  Usuario: string;
}
