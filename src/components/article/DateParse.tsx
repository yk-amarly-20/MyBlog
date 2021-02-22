// datetime parse
// 記事一覧に表示するやつtimestampだとよくわからんので

import { parseISO, format } from "date-fns";
import React from 'react';

type Props = {
  timestamp: string;
  className: string;
};

export const Date: React.VFC<Props> = (props) => {
  const parsed_date = parseISO(props.timestamp);

  return (
    <time dateTime={props.timestamp} className={props.className}>
      {format(parsed_date, "yyyy/MM/dd HH:mm")}
    </time>
  );
};
