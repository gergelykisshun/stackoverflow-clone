const getPathToPushWithNewQuery = (
  query: Record<any, any>,
  queryString: string,
  queryValue: string | number,
  currentPath: string
): string => {
  const queryCount = Object.keys(query).length;

  return currentPath.includes(queryString)
    ? currentPath.replace(
        `${queryString}=${query[queryString]}`,
        `${queryString}=${queryValue}`
      )
    : `${currentPath}${queryCount ? "&" : "?"}${queryString}=${queryValue}`;
};

export default getPathToPushWithNewQuery;
