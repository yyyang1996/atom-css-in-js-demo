export enum Status {
  Init = 0,
  Active = 1,
  Mount = 2,
}

export interface Atom {
  selector: string;
  className: string;
  property: string;
  value: string;
  pseudos: string[];
  rule: string;
  status: Status;
  __isAtom__: true;
}

export type AtomOptions = {
  pseudos?: string[];
};

export type Style = Record<string, string>;

export type DeepArray<T> = Array<T | T[] | T[][]>;
