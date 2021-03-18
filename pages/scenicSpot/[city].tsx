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

export type ScenicSpotCityPageProps = {
  city: string;
};

function ScenicSpotCityPage({ city }: ScenicSpotCityPageProps) {
  const [hint, setHint] = useAutoHideHint();
  const scenicSpots = useScenicSpots('/' + city);

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

export async function getStaticProps(context) {
  const { city } = context.params;
  return { props: { city } };
}

export async function getStaticPaths() {
  const paths = Object.keys(cityNames).map((city) => ({ params: { city } }));
  return { paths, fallback: false };
}

export default ScenicSpotCityPage;
