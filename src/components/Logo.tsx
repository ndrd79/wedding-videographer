'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="block py-2">
      <Image
        src="/images/logo.png"
        alt="Vanderoski Wedding Films"
        width={250}
        height={89}
        priority
        className="h-[50px] w-auto"
      />
    </Link>
  );
}
