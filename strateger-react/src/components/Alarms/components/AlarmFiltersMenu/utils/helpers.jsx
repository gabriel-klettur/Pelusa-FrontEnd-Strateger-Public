export const initializeState = (keys) => keys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
