"use client"

import React from 'react'

type Props = {
    quote:string;
}

export function TypographyBlockquote({quote}:Props) {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic bg-white text-black rounded-2xl text-center p-3">
       
       "{quote}"
      </blockquote>
    )
  }

export default TypographyBlockquote;