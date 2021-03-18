import React from 'react';
import Link from 'next/link';

const toCityLinkItem = ([value, name]: [string, string], index: number) => (
  <li key={index}>
    <Link href={'/scenicSpot/' + value}>
      <a href={'/scenicSpot/' + value}>{name}景點列表</a>
    </Link>
  </li>
);

const toFillingItems = (_: any, index: number) => <li key={index + 24} />;

const toCityLinkItems = (cityNames: Record<string, string>) =>
  Object.entries(cityNames).map(toCityLinkItem);

const fillingItems = Array.from({ length: 24 }, toFillingItems);

function Navbar(cityNames: Record<string, string>) {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/scenicSpot">
            <a href="/scenicSpot">全部景點列表</a>
          </Link>
        </li>
        {toCityLinkItems(cityNames)}
        {fillingItems}
      </ul>
    </nav>
  );
}

export default Navbar;
