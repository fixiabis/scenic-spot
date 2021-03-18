import React from 'react';
import { ScenicSpot } from '../types';

const toScenicSpotItem = (scenicSpot: ScenicSpot, index: number) => (
  <li key={index} className="scenic-spot">
    {scenicSpot.Name}
    <hr />
    {scenicSpot.Description || scenicSpot.DescriptionDetail}
  </li>
);

function ScenicSpotList(scenicSpots: ScenicSpot[]) {
  return (
    <ul className="scenic-spots-container">
      {scenicSpots.map(toScenicSpotItem)}
    </ul>
  );
}

export default ScenicSpotList;
