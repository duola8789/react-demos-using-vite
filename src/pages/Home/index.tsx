import React from 'react';
import styles from './index.module.scss';
import logo from '@/assets/images/logo.svg';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h1 className="text-3xl font-bold bg-amber-50">Hello world!</h1>
    </div>
  );
};

export default Home;
