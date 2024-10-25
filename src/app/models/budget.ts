export interface Budget {
  id?: string;
  client: string;
  date: Date;
  modules: ModuleQuote[];
}

export interface ModuleQuote {
  moduleType: ModuleType;
  zone: Zone;
}

export enum Zone {
  LIVING = 'Living',
  COMEDOR = 'Comedor',
  KITCHEN = 'Cocina',
  ROOM = 'Dormitorio',
}

export interface ModuleType {
  id: number;
  name: string;
  slots: number;
  price: number;
}
