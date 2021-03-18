import { useEffect } from 'react';

function useEffectOnScrollToBottom(effectCallback: () => void) {
  useEffect(() => {
    addEffect();
    return removeEffect;

    function handleScroll() {
      const scrollingElement = document.scrollingElement as HTMLElement;
      const { clientHeight, scrollHeight, scrollTop } = scrollingElement;
      const scrollBottom = scrollTop + clientHeight;
      const bottomDistance = scrollHeight - scrollBottom;

      if (bottomDistance === 0) {
        effectCallback();
      }
    }

    function addEffect() {
      window.addEventListener('scroll', handleScroll);
    }

    function removeEffect() {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [effectCallback]);
}

export default useEffectOnScrollToBottom;
