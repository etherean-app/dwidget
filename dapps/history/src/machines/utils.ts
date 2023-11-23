export async function safeCall<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    return Promise.reject((error as Error)?.message);
  }
}
