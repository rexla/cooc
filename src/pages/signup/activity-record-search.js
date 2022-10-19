import React from "react";
import PropTypes from "prop-types";
import Logger from "../../lib/Logger";

const logger = new Logger("/signup/activity-record-search");

const ActivityRecordSearch = (props) => {
  logger.debug("render");
  return <div>活動紀錄查詢</div>;
};

ActivityRecordSearch.propTypes = {};

export default ActivityRecordSearch;
