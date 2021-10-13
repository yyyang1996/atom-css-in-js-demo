import React from 'react';
import { css, hover, createColorTokens, compose, mount } from './atom-css';

const palette = {
  white: '#ffffff',
  black: '#000000',
  blue: '#0d80f2',
  indigo: '#19B3E6',
  red: '#F42547',
  green: '#2EB873',
  yellow: '#F2EB0D',
  orange: '#E6C419',
  pink: '#F20D6C',
  purple: '#B946B9',
  teal: '#39ACA3',
  gray: '#818C98',
};

const tokens = createColorTokens(palette);

const app = compose(
  tokens.colors.white,
  css({
    width: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  }),
);

const header = compose(
  tokens.background.black,
  css({ height: `100px` }),
  hover(
    tokens.colors.blue,
    css({
      height: '120px',
    }),
  ),
);

const main = compose(tokens.background.gray, css({ minHeight: '500px' }));

const footer = compose(
  tokens.background.indigo,
  css({
    height: '60px',
    padding: '20px',
  }),
);

function App() {
  React.useEffect(() => {
    mount();
  }, []);

  return (
    <div className={app}>
      <header className={header}>header</header>
      <main className={main}>main</main>
      <footer className={footer}>footer</footer>
    </div>
  );
}

export default App;
