import { useEffect, useState } from 'react';

const initialHint = {
  text: '',
  isActive: false,
};

function useAutoHideHint(delay: number = 1000) {
  const [hint, setHint] = useState(initialHint);

  useEffect(() => {
    if (hint.isActive) {
      setTimeout(
        () => setHint((hint) => ({ ...hint, isActive: false })),
        delay
      );
    }
  }, [delay, hint]);

  return [hint, setHint] as [typeof hint, typeof setHint];
}

export default useAutoHideHint;
