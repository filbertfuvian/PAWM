import React from 'react';
import styles from '../styles/ProgressBar.module.css'; 

const ProgressBar = ({ completed, total }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;