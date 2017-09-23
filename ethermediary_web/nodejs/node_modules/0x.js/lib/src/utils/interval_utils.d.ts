export declare const intervalUtils: {
    setAsyncExcludingInterval(fn: () => Promise<void>, intervalMs: number): number;
    clearAsyncExcludingInterval(intervalId: number): void;
};
