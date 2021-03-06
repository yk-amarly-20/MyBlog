import { parseISO, format } from "date-fns";
import React from "react";

type Props = {
  timestamp: string;
};

export const Date: React.VFCX<Props> = props => {
  const convertedDate = parseISO(props.timestamp);
  return (
    <time dateTime={props.timestamp} className={props.className}>
      {format(convertedDate, "yyyy/MM/dd HH:mm")}
    </time>
  );
};
