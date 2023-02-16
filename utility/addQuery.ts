const getPathToPushWithNewQuery = (
  query: Record<any, any>,
  queryString: string,
  queryValue: string | number,
  currentPath: string
): string => {
  const queryCount = Object.keys(query).length;

  return currentPath.includes(queryString)
    ? currentPath.replace(`page=${query[queryString]}`, `page=${queryValue}`)
    : `${currentPath}${queryCount ? "&" : "?"}page=${queryValue}`;
};

export default getPathToPushWithNewQuery;
