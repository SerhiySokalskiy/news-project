import { useEffect, useState } from 'react';
import 'virtual:prebid';

const AdSlot = ({ slotId, width = 300, height = 250 }) => {

  return (
    <iframe
      id={slotId}
      title={slotId}
      style={{ width, height, border: 'none', overflow: "hidden" }}
      scrolling='no'
    />
  );
};

export default AdSlot;
