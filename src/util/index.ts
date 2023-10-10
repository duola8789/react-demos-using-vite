import { DataListItem, DataMap } from '@/pages/beautiful-dnd/types';
import { STAGES } from '@/pages/beautiful-dnd/config';
import { debounce } from 'lodash-es';

export const clipItemToIndex = (input: any[], oldIndex: number, newIndex: number) => {
  const len = input.length;
  if (oldIndex > len || newIndex > len || oldIndex === newIndex) {
    return input;
  }
  const result = [...input];
  const newItem = result.splice(oldIndex, 1);
  result.splice(newIndex, 0, newItem[0]);
  return result;
};

export const recordDragList = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const genFakeList = (stageId: string, length = 10): DataListItem[] =>
  Array.from({ length }).map((_v, index) => ({ stageId, id: `${stageId}-item-${index}`, content: index + '' }));

export const genGroupFakeList = (length = 10): DataMap =>
  STAGES.reduce((total, current) => {
    total[current.id] = genFakeList(current.id, length);
    return total;
  }, {} as DataMap);

export const mockPromise = (success = true): Promise<boolean> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(success);
    }, 5000);
  });

interface RequestWithLocalRollbackResult<T> {
  success: boolean;
  state: T | undefined;
}

export const requestWithLocalRollback = <T, Q>(req: (reqParams: Q) => Promise<boolean>, debounceTime = 1000) => {
  const cache: { id: string; state: unknown; waiting: boolean } = { id: '', state: undefined, waiting: false };
  let reqId = '';

  const requestDebounce = debounce(
    async (resolve: (param: RequestWithLocalRollbackResult<T>) => void, reqParams: Q) => {
      cache.waiting = false;
      try {
        const suss = await req(reqParams);
        if (!suss && cache.id === reqId) {
          resolve({ state: cache.state as T, success: false });
        } else {
          resolve({ state: undefined, success: true });
        }
      } catch (e) {
        if (cache.id === reqId) {
          resolve({ state: cache.state as T, success: false });
        } else {
          resolve({ state: undefined, success: false });
        }
      }
    },
    debounceTime
  );

  return (state: T, reqParams: Q): Promise<RequestWithLocalRollbackResult<T>> | undefined =>
    new Promise((resolve) => {
      if (!cache.waiting) {
        reqId = Date.now() + '';
        cache.waiting = true;
        cache.id = reqId;
        cache.state = state;
      }

      requestDebounce(resolve, reqParams);
    });
};

interface RollbackRes {
  success: boolean;
  needRollback: boolean;
}

export const debounceRequestWithRollback = <Q>(req: (reqParams: Q) => Promise<boolean>, debounceTime = 1000) => {
  const cache: { id: string } = { id: '' };

  const requestDebounce = debounce(async (resolve: (param: RollbackRes) => void, reqParams: Q, _reqId: string) => {
    try {
      const suss = await req(reqParams);
      if (!suss) {
        resolve({ success: false, needRollback: cache.id === _reqId });
      } else {
        resolve({ success: true, needRollback: false });
      }
    } catch (e) {
      resolve({ success: false, needRollback: cache.id === _reqId });
    }
  }, debounceTime);

  return (reqParams: Q): Promise<RollbackRes> =>
    new Promise((resolve) => {
      const reqId = Date.now() + '';
      cache.id = reqId;
      requestDebounce(resolve, reqParams, reqId);
    });
};
