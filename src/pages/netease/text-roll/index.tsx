import React, { useMemo, useState } from 'react';
import TextRoll from '@/components/text-roll';
import styles from './index.module.scss';
import { getLastDayInWeek, getRecentWeekday } from '@/util';

const LOCAL_KEY = 'report_click';

const TextRollPage = () => {
  const lastMonday = getLastDayInWeek(1, 'MM.DD');
  const lastSunday = getLastDayInWeek(7, 'MM.DD');
  const contentList = ['查看企业周报', `${lastMonday}-${lastSunday}`];
  const [redPointVisible, setRedPointVisible] = useState(true);

  const showRedPoint = useMemo(() => {
    const localData = localStorage.getItem(LOCAL_KEY);
    if (!localData) {
      return true;
    }

    return +localData < (getRecentWeekday(1) as number);
  }, []);

  const showReport = () => {
    console.log(123);
    setRedPointVisible(false);
    localStorage.setItem(LOCAL_KEY, Date.now() + '');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container} onClick={showReport}>
        <TextRoll width={116} contentList={contentList} pause={3000} duration={500} />
        {showRedPoint && redPointVisible ? <div className={styles.redPoint}></div> : <></>}
      </div>
    </div>
  );
};

export default TextRollPage;
