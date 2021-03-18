import React, { Fragment } from 'react';

import {
  BottomHint,
  Navbar,
  ScenicSpotList,
  useAutoHideHint,
  useEffectOnScrollToBottom,
  useScenicSpots,
} from '../../components';

import { cityNames } from '../../values';

function ScenicSpotPage() {
  const [hint, setHint] = useAutoHideHint();
  const scenicSpots = useScenicSpots();

  useEffectOnScrollToBottom(() =>
    scenicSpots
      .load()
      .catch(() => setHint({ text: '無法載入更多景點了', isActive: true }))
  );

  return (
    <Fragment>
      {Navbar(cityNames)}
      {ScenicSpotList(scenicSpots.data)}
      {BottomHint(hint.text, hint.isActive)}
    </Fragment>
  );
}

export default ScenicSpotPage;
