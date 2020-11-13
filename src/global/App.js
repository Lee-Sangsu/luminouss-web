import React, { useEffect, useState } from 'react';
import AppRouter from './Router';

function App() {
  return (<>
      <AppRouter />
      <footer>&copy; {new Date().getFullYear()} Luminouss</footer>
      </>
  );
};

export default App;
