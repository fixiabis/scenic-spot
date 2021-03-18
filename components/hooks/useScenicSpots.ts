import { useCallback, useEffect, useState } from 'react';
import { parseJson, throwErrorOnNotOk, toQueryString } from '../utils';
import { ScenicSpot } from '../types';

const scenicSpotApiUrl =
  'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot';

const defaultQueryParams = {
  $format: 'JSON',
  $top: 30,
};

const defaultQueryString = toQueryString(defaultQueryParams);

const fetchScenicSpots = (cityPath: string, queryString: string) =>
  fetch(scenicSpotApiUrl + cityPath + '?' + queryString)
    .then(throwErrorOnNotOk)
    .then(parseJson) as Promise<ScenicSpot[]>;

const initialScenicSpots = {
  data: [],
  isLoaded: false,
};

function useScenicSpots(cityPath: string = '') {
  const [scenicSpots, setScenicSpots] = useState(initialScenicSpots);

  const loadScenicSpots = useCallback(async () => {
    if (scenicSpots.isLoaded) {
      return;
    }

    const queryParams = { $skip: scenicSpots.data.length };

    const queryString = toQueryString(queryParams) + '&' + defaultQueryString;

    const whenScenicSpotsLoaded = fetchScenicSpots(cityPath, queryString)
      .then((partialData) => scenicSpots.data.concat(partialData))
      .then((data) =>
        setScenicSpots((scenicSpots) =>
          scenicSpots.data.length === data.length
            ? { ...scenicSpots, isLoaded: true }
            : { ...scenicSpots, data }
        )
      );

    return whenScenicSpotsLoaded;
  }, [cityPath, scenicSpots, setScenicSpots]);

  useEffect(() => {
    setScenicSpots(initialScenicSpots);

    fetchScenicSpots(cityPath, defaultQueryString).then((data) =>
      setScenicSpots({ data, isLoaded: false })
    );
  }, [cityPath]);

  return {
    ...scenicSpots,
    load: loadScenicSpots,
  };
}

export default useScenicSpots;
