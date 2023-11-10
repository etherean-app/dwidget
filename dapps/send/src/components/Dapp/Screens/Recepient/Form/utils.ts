const regex = new RegExp("[-a-zA-Z0-9@._]{1,256}.eth");

export const isValidENS = (ens?: string) => {
  if (!ens) {
    return false;
  }

  return regex.test(ens);
};
