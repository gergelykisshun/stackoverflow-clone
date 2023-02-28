const transformValuesIntoQuery = (values: Record<string | number, any>) => {
  let queryString = "?";
  Object.keys(values).forEach((key, i) => {
    const newQueryString = `${i === 0 ? "" : "&"}${key}=${
      typeof values[key] !== "boolean"
        ? values[key]
        : values[key]
        ? "True"
        : "False"
    }`;
    queryString += newQueryString;
  });
  return queryString;
};

export default transformValuesIntoQuery;
