/* eslint-disable linebreak-style */
import React from 'react';

export default function Spans({ icon }) {
  const iconn = icon;

  return (
    <span className="p-inputgroup-addon" id="span">
      <i className={iconn} id="i" />
    </span>
  );
}
