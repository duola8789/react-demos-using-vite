import React from 'react';
import styles from '../style..module.scss';
import { WaterFallCardItem } from '@/pages/netease/waterfall/types';

interface Props {
  data: WaterFallCardItem;
}

const Card: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.card} style={{ height: data.height }}>
      {data.name}
    </div>
  );
};

export default Card;
