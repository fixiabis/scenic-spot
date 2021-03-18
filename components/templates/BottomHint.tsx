import React from 'react';

function BottomHint(text: string, isActive: boolean) {
  return (
    <div
      className={'bottom-hint' + (isActive ? ' active' : '')}
      children={text}
    />
  );
}

export default BottomHint;
