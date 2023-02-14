import moment from "moment";

const epochToDate = (timestamp: number): string => {
  return moment.unix(timestamp).format("ddd, MMMM Do, YYYY");
};

export default epochToDate;
