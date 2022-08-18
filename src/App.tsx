import styles from './App.module.css';
import { FunctionComponent } from 'react';
import Header from './components/Header/Header';

const App: FunctionComponent = () => (
  <div className={styles.App}>
    <Header/>
  </div>
);

export default App;
