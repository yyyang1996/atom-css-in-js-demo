import { Atom, AtomOptions, Status } from './types';
import { reactive } from '@vue/reactivity';

let index = 1;
export const atomMap = reactive<Map<string, Atom>>(new Map());

export const createAtom = (property: string, value: string, options: AtomOptions = {}) => {
  const { pseudos = [] } = options;
  value = value.trim();
  property = property.trim();
  const pseudo = pseudos.join(':');
  const id = `${pseudo}_${property}_${value}`.trim();

  const atom = atomMap.get(id);

  if (atom) {
    return atom;
  }

  const className = 'atom-' + index++;
  const selector = pseudo ? `.${className}:${pseudo}` : `.${className}`;

  const newAtom: Atom = {
    value,
    property,
    pseudos,
    selector,
    status: Status.Init,
    get className() {
      if (newAtom.status === Status.Init) {
        newAtom.status = Status.Active;
      }
      return className;
    },
    get rule() {
      return `${selector} { ${property}: ${value}; }`;
    },
    __isAtom__: true,
  };

  atomMap.set(id, newAtom);

  return newAtom;
};

export const isAtom = (val: any): val is Atom => {
  if (typeof val === 'object') {
    return val.__isAtom__;
  }
  return false;
};
