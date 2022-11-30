export interface Ticket {
  id: string;
  fecha: string;
  idcliente: number;
}

export interface Client {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  idusuario: number;
}
