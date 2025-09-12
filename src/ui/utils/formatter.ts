import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import numeral from 'numeral';

import { Ripemd160, sha256 } from '@cosmjs/crypto';
import {
  fromBase64,
  fromBech32, // fromHex,
  // toBase64,
  toBech32,
  toHex
} from '@cosmjs/encoding';

export const toDay = (time?: string | number | Date, format = 'long') => {
  if (!time) return '';
  if (format === 'long') {
    return dayjs(time).format('YYYY-MM-DD HH:mm');
  }
  if (format === 'date') {
    return dayjs(time).format('YYYY-MM-DD');
  }
  if (format === 'time') {
    return dayjs(time).format('HH:mm:ss');
  }
  if (format === 'from') {
    return dayjs(time).fromNow();
  }
  if (format === 'to') {
    return dayjs(time).toNow();
  }
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};

export const calculatePercent = (input?: string | number, total?: string | number) => {
  if (!input || !total) return '0';
  const percent = new BigNumber(input).div(total).toNumber();
  if (percent === Infinity) {
    return '0';
  }
  return numeral(percent > 0.001 ? percent : 0).format('0.[00]%');
};

export function operatorAddressToAccount(operAddress?: string) {
  if (!operAddress) return '';
  const { prefix, data } = fromBech32(operAddress);
  if (prefix === 'iva') {
    // handle special cases
    return toBech32('iaa', data);
  }
  if (prefix === 'crocncl') {
    // handle special cases
    return toBech32('cro', data);
  }
  return toBech32(prefix.replace('valoper', ''), data);
}

export function consensusPubkeyToHexAddress(consensusPubkey?: { '@type': string; key: string }) {
  if (!consensusPubkey) return '';
  const raw = '';
  if (consensusPubkey['@type'] === '/cosmos.crypto.ed25519.PubKey') {
    const pubkey = fromBase64(consensusPubkey.key);
    if (pubkey) return toHex(sha256(pubkey)).slice(0, 40).toUpperCase();
  }

  if (consensusPubkey['@type'] === '/cosmos.crypto.secp256k1.PubKey') {
    const pubkey = fromBase64(consensusPubkey.key);
    if (pubkey) return toHex(new Ripemd160().update(sha256(pubkey)).digest());
  }
  return raw;
}

export function pubKeyToValcons(consensusPubkey: { '@type': string; key: string }, prefix: string) {
  if (consensusPubkey && consensusPubkey.key) {
    const pubkey = fromBase64(consensusPubkey.key);
    if (pubkey) {
      const addressData = sha256(pubkey).slice(0, 20);
      return toBech32(`${prefix}valcons`, addressData);
    }
  }
  return '';
}

export function valoperToPrefix(valoper?: string) {
  if (!valoper) return '';
  const prefixIndex = valoper.indexOf('valoper');
  if (prefixIndex === -1) return null;
  return valoper.slice(0, prefixIndex);
}

export function toUnitAmount(amount: string, exp: number | string) {
  return BigNumber(amount).times(BigNumber(10).pow(exp)).toFixed(0);
}

export function toReadableAmount(amount: string, exp: number | string, pre?: string | number) {
  if (BigNumber(amount).isZero()) {
    return '0';
  }
  return BigNumber(amount)
    .div(BigNumber(10).pow(exp))
    .toFixed(Number(pre || exp), BigNumber.ROUND_DOWN)
    .replace(/\.?0*$/, '');
}

export function formatTimeWithUTC(time: string | number) {
  const timeFormat = dayjs(time).format('MMM-D-YYYY HH:mm');
  // const timeZone = dayjs().utcOffset() / 60;
  // return `${timeFormat} UTC${timeZone > 0 ? "+" : ""}${timeZone !== 0 ? timeZone + ":00" : ""}`;
  return `${timeFormat}`;
}

export function calcToTime(timestamp: number | string) {
  timestamp = dayjs(timestamp).valueOf();
  const now = dayjs().valueOf();
  const diff = timestamp - now; // 差距（毫秒）
  let days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    text = '';
  if (diff > 0) {
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) {
      text = `${days}d`;
    }
    hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours > 0) {
      text = `${text} ${hours}h`;
    }
    minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes > 0) {
      text = `${text} ${minutes}m`;
    }
    seconds = Math.floor((diff % (1000 * 60)) / 1000);
    if (seconds > 0) {
      text = `${text} ${seconds}s`;
    }
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    text
  };
}

export enum TimePeriod {
  YEAR = 'Y',
  MONTH = 'M',
  WEEK = 'W',
  DAY = 'days',
  HOUR = 'H',
  MINUTE = 'm',
  SECOND = 's'
}

export function convertTimePeriod(period: string): {
  value: number;
  period: TimePeriod;
  label: string;
} {
  if (period.includes(TimePeriod.SECOND)) {
    const [sec] = period.split(TimePeriod.SECOND);
    const seconds = +sec;

    // if (seconds >= 31536000) {
    //   // 365天
    //   const years = Math.floor(seconds / 31536000);
    //   return `${years}Y`;
    // } else
    if (seconds >= 2592000) {
      // 30天
      const months = Math.floor(seconds / 2592000);
      return {
        value: months,
        period: TimePeriod.MONTH,
        label: `${months}${TimePeriod.MONTH}`
      };
    } else if (seconds >= 604800) {
      // 7天
      const weeks = Math.floor(seconds / 604800);
      return {
        value: weeks,
        period: TimePeriod.WEEK,
        label: `${weeks}${TimePeriod.WEEK}`
      };
    } else if (seconds >= 86400 * 2) {
      // 48小时
      const days = Math.floor(seconds / 86400);
      return {
        value: days,
        period: TimePeriod.DAY,
        label: `${days}${TimePeriod.DAY}`
      };
    } else if (seconds >= 86400) {
      // 24小时
      const days = Math.floor(seconds / 86400);
      return {
        value: days,
        period: TimePeriod.DAY,
        label: `${days}${TimePeriod.DAY}`
      };
    } else if (seconds >= 3600) {
      // 60分钟
      const hours = Math.floor(seconds / 3600);
      return {
        value: hours,
        period: TimePeriod.HOUR,
        label: `${hours}${TimePeriod.HOUR}`
      };
    } else if (seconds >= 60) {
      // 60秒
      const minutes = Math.floor(seconds / 60);
      return {
        value: minutes,
        period: TimePeriod.MINUTE,
        label: `${minutes}${TimePeriod.MINUTE}`
      };
    } else {
      return {
        value: seconds,
        period: TimePeriod.SECOND,
        label: `${seconds}${TimePeriod.SECOND}`
      };
    }
  }

  // 如果不是秒格式，直接返回原值
  return {
    value: 0,
    period: TimePeriod.SECOND,
    label: `${0}${TimePeriod.SECOND}`
  };
}
