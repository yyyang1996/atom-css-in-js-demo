import { createAtom } from './atom';
import { Atom } from './types';

type Mapper<T extends Record<string, any>, U> = Record<keyof T, U>;

function createColorTokens<T extends Record<string, string>>(config: T) {
  const tokens = {
    colors: {},
    background: {},
    border: {},
  } as {
    colors: Mapper<T, Atom>;
    background: Mapper<T, Atom>;
    border: Mapper<T, Atom>;
  };

  Object.keys(config).forEach((name: keyof T) => {
    tokens.colors[name] = createAtom('color', config[name]);
    tokens.background[name] = createAtom('background', config[name]);
    tokens.border[name] = createAtom('border-color', config[name]);
  });

  return tokens;
}

export { createColorTokens };
