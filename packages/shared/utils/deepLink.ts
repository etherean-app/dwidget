// TODO: check is mobile or web and change address to work in browser

export const deepLinkDapp = (url: string) => {
  return `etherean://dApp?url=${url}`;
};

export const deepLinkDappNative = (url: string) => {
  return `etherean://dApp/native?url=${url}`;
};
