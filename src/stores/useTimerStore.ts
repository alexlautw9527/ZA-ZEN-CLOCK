import { create } from "zustand";

// 定義 Interval 參考點
export const REFERENCE_FROM = {
  START: "start",
  END: "end",
} as const;

export type ReferenceFrom =
  (typeof REFERENCE_FROM)[keyof typeof REFERENCE_FROM];

export type Interval = {
  id: number;
  time: number;
  repeat: boolean;
  referenceFrom: ReferenceFrom;
  repeatEvery: number;
  repeatCount: number;
  callback: () => void;
};

type TimerState = {
  duration: number;
  warmUp: number;
  remainingTime: number;
  intervals: Interval[];
  isRunning: boolean;
  isPaused: boolean;
  setDuration: (duration: number) => void;
  setWarmUp: (warmUp: number) => void;
  addInterval: (interval: Interval) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export const useTimerStore = create<TimerState>((set, get) => ({
  duration: 0,
  warmUp: 0,
  remainingTime: 0,
  intervals: [],
  isRunning: false,
  isPaused: false,
  elapsedTime: () => {
    const { duration, remainingTime } = get();
    return duration - remainingTime;
  },
  setDuration: (duration: number) => set({ duration, remainingTime: duration }),
  setRemainingTime: (remainingTime: number) => set({ remainingTime }),
  setWarmUp: (warmUp: number) => set({ warmUp }),
  addInterval: (interval: Interval) => {
    set((state) => ({ intervals: [...state.intervals, interval] }));
  },
  start: () => {
    const { warmUp, duration } = get();
    set({ remainingTime: duration + warmUp, isRunning: true, isPaused: false });
  },
  pause: () => set({ isRunning: false, isPaused: true }),
  reset: () =>
    set({ remainingTime: get().duration, isRunning: false, isPaused: false }),
}));
