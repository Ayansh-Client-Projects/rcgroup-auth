interface RejectedPromise {
  error: Error;
  data: null;
}

interface ResolvedPromise<T> {
  error: null;
  data: T;
}

export type HandledPromise<T> = Promise<ResolvedPromise<T> | RejectedPromise>;

export async function handle<T>(promise: Promise<T>): HandledPromise<T> {
  try {
    const res = await promise;
    return {
      error: null,
      data: res,
    };
  } catch (err) {
    return {
      error: err,
      data: null,
    };
  }
}
