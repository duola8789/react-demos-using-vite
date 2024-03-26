import React from 'react';
import styles from './index.module.scss';
import logo from '@/assets/images/logo.svg';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <img className={styles.logo} src={logo} alt="logo" />
    </div>
  );
};

export default Home;
