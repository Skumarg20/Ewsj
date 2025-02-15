"use client"

import React from 'react'

type Props = {
    quote:string;
}

export function TypographyBlockquote({quote}:Props) {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic bg-white text-black">
       {quote}
      </blockquote>
    )
  }

export default TypographyBlockquote;