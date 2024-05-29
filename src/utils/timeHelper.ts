import { REFERENCE_FROM, type Interval } from "@stores/useTimerStore";

// 常數
export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 3600;

// 時間格式轉換
export const formatTime = (
  hours: number,
  minutes: number,
  seconds: number,
): number => hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;

export const parseTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE,
  );
  const seconds = totalSeconds % SECONDS_IN_MINUTE;
  return { hours, minutes, seconds };
};

// 檢查 Interval 是否與 Duration 衝突
export const checkIntervalConflict = (
  intervals: Interval[],
  duration: number,
): boolean =>
  intervals.some((interval) => {
    const intervalDuration =
      interval.referenceFrom === REFERENCE_FROM.START
        ? interval.time
        : duration - interval.time;
    return intervalDuration < 0 || intervalDuration > duration;
  });
