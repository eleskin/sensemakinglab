import styles from './App.module.css';
import { FunctionComponent } from 'react';
import Header from './components/Header/Header';
import Table from './components/Table/Table';

const App: FunctionComponent = () => (
  <div className={styles.App}>
    <Header/>
    <Table/>
  </div>
);

export default App;
