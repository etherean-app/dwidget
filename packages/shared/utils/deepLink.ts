// TODO: check is mobile or web and change address to work in browser

export const deepLinkDapp = (url: string) => {
  return `etherean://dapp?url=${encodeURIComponent(url)}`;
};

export const deepLinkDappNative = (url: string) => {
  return `etherean://dapp/native?url=${encodeURIComponent(url)}`;
};
