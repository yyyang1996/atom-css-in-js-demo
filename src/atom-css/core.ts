import { watch } from '@vue-reactivity/watch';
import { atomMap, createAtom, isAtom } from './atom';
import { Atom, Style, Status, DeepArray } from './types';
import { paramCase } from 'change-case';

const transform = (pseudos: string[], atoms: DeepArray<Atom | Style>) => {
  return atoms.flat(3).reduce<Atom[]>((atoms, item) => {
    if (isAtom(item)) {
      const atom = pseudos.length
        ? createAtom(item.property, item.value, { pseudos: [...item.pseudos, ...pseudos] })
        : item;
      atoms.push(atom);
    } else {
      const results = Object.entries(item).reduce((atoms, [prop, value]) => {
        const atom = createAtom(paramCase(prop), value, { pseudos });
        atoms.push(atom);
        return atoms;
      }, [] as Atom[]);

      atoms.push(...results);
    }
    return atoms;
  }, []);
};

const css = (...styles: Style[]) => {
  return transform([], styles);
};

const withPseudo = (pseudos: string[], ...atoms: DeepArray<Atom>) => {
  return transform(pseudos, atoms);
};

const hover = withPseudo.bind(null, ['hover']);
const disabled = withPseudo.bind(null, ['disabled']);

const compose = (...atoms: DeepArray<Atom>) => {
  return atoms
    .flat(3)
    .map(atom => atom.className)
    .join(' ');
};

const mount = () => {
  const styleTag = document.getElementById('atom-css') || document.createElement('style');
  styleTag.setAttribute('id', 'atom-css');
  document.head.appendChild(styleTag);

  const mountMap: Record<string, boolean> = {};

  watch(
    atomMap,
    () => {
      const rules: string[] = [];
      atomMap.forEach(atom => {
        if (atom.status < Status.Active) {
          return;
        }

        if (mountMap[atom.className]) {
          return;
        }

        mountMap[atom.className] = true;

        rules.push(atom.rule);
      });

      const textNode = document.createTextNode(rules.join('\n'));
      styleTag.appendChild(textNode);
    },
    { immediate: true },
  );
};

export { css, mount, compose, hover, disabled };
