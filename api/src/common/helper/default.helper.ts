const defaultTo = (defaultValue: any) => (extractor: any) => (result: any) => {
  try {
    return extractor(result) || defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export default defaultTo;

export const defaultToNull = defaultTo(null);
export const defaultToEmptyArray = defaultTo([]);
export const defaultToEmptyObject = defaultTo({});
