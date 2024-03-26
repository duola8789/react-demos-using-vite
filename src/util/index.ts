import dayjs, { Dayjs } from 'dayjs';
import { debounce } from 'lodash-es';
import CryptoJS from 'crypto-js';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const clipItemToIndex = <T>(input: T[], oldIndex: number, newIndex: number): T[] => {
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

export const mockPromise = (success = true): Promise<boolean> =>
  new Promise(resolve => {
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

  const requestDebounce = debounce(async (resolve: (param: RequestWithLocalRollbackResult<T>) => void, reqParams: Q) => {
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
  }, debounceTime);

  return (state: T, reqParams: Q): Promise<RequestWithLocalRollbackResult<T>> | undefined =>
    new Promise(resolve => {
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
    new Promise(resolve => {
      const reqId = Date.now() + '';
      cache.id = reqId;
      requestDebounce(resolve, reqParams, reqId);
    });
};
// 加密
export const encrypt = (word: string, keyStr: string) => {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const src = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(src, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

// 解密
export const decrypt = (content: string, keyStr: string) => {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const decrypt = CryptoJS.AES.decrypt(content, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

// 获取上一周的周一-周日
export const getLastDayInWeek = (day: number, format?: string): string | number => {
  const today = dayjs();
  const result = today.isoWeekday(1).startOf('week').subtract(7, 'day').day(day);
  return format ? result.format(format) : result.valueOf();
};

// 获取最近的一个周几（注意，周日 === 0）
export const getRecentWeekday = (day: number, format?: string): string | number => {
  const now = dayjs();
  const dayOfWeek = now.day(); // 获取今天是星期几
  let result: Dayjs;

  // 以获取周二为例
  if (dayOfWeek === day) {
    // 如果今天就是周二，返回今天的日期
    result = now.startOf('day');
  } else if (dayOfWeek < day) {
    // 如果今天是周一或之前的日期，返回上一周的周二日期
    result = now.startOf('week').subtract(7 - day, 'day');
  } else {
    // 如果今天是周三或之后的日期，返回昨天的日期
    result = now.startOf('week').add(day, 'day');
  }
  return format ? result.format(format) : result.valueOf();
};
