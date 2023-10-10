import React, { useRef } from 'react';
import styles from './style..module.scss';
import Card from '@/pages/WaterFall/components/card';
import { WaterFallCardItem } from '@/pages/WaterFall/types';
import { Random } from 'mockjs';
import Masonry from 'react-masonry-component';
import { useInfiniteScroll, useScroll } from 'ahooks';

interface Result {
  all: number;
  list: WaterFallCardItem[];
}

const makeData = (length = 20, start = 0): WaterFallCardItem[] =>
  Array.from({ length }).map((_v, index) => ({
    name: Random.cword(3),
    id: start + index + 1,
    height: Random.pick([100, 200, 300])
  }));

const request = (length = 20, start = 0): Promise<Result> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        all: 100,
        list: makeData(length, start)
      });
    }, 1000);
  });

const WaterFallComp = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { data, loading, loadingMore, noMore } = useInfiniteScroll<Result>(d => request(20, d?.list.length), {
    target: ref,
    isNoMore: d => !!d?.all && d?.list.length === d?.all
  });

  const scroll = useScroll(ref);

  console.log(scroll?.top);

  return (
    <div className={styles.container} id="scrollableDiv" ref={ref}>
      {loading ? <p className={styles.cardLoading}>Loading</p> : <></>}
      {/* https://masonry.desandro.com/options.html */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/* @ts-ignore */}
      <Masonry className={styles.masonryGrid} options={{ transitionDuration: 0, itemSelector: '.grid' }}>
        {data?.list ? (
          data?.list.map(v => (
            <div className="grid" key={v.id} style={{ width: '25%', padding: '20px', boxSizing: 'content-box' }}>
              <Card data={v} />
            </div>
          ))
        ) : (
          <></>
        )}
      </Masonry>
      {noMore ? <p className={styles.cardLoading}>noMore</p> : <></>}
      {loadingMore ? <p className={styles.cardLoading}>loadingMore</p> : <></>}
    </div>
  );
};

export default WaterFallComp;
