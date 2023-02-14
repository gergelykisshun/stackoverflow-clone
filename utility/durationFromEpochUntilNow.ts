import moment from "moment";

const durationFromEpochUntilNow = (timestamp: number) => {
  const now = moment(new Date()).format("X");

  const duration = moment.duration(Number(now) - timestamp, "seconds");

  return `${duration.years()} years and ${duration.days()} days`;
};

export default durationFromEpochUntilNow;
