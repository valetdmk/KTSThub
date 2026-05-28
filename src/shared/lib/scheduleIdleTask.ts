type IdleWindow = Window & typeof globalThis & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export const scheduleIdleTask = (task: () => void, timeout = 250) => {
  if (typeof window === "undefined") {
    task();
    return () => undefined;
  }

  const idleWindow = window as IdleWindow;

  if (idleWindow.requestIdleCallback) {
    const handle = idleWindow.requestIdleCallback(() => task(), { timeout });

    return () => idleWindow.cancelIdleCallback?.(handle);
  }

  const handle = window.setTimeout(task, timeout);

  return () => window.clearTimeout(handle);
};
