// tell me where main file is and we can wrap context around it?

let globalCredential = null;

export const setGlobalCredential = credential => {
  globalCredential = credential;
};

export const getGlobalCredential = () => {
  return globalCredential;
};
