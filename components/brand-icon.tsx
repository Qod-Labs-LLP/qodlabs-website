import React from 'react'

interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

/**
 * Authentic Qod Labs orbital 'Q' emblem component.
 * Renders the circular Q core with its lower diagonal slash and
 * upper-right orbital trajectory path with the terminal dot node.
 */
export function BrandIcon({ className = 'h-5 w-5', ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Circular main Q loop */}
        <circle cx="100" cy="129" r="63.5" />
        {/* Diagonal Q slash tail */}
        <line x1="116" y1="158" x2="149" y2="191" strokeWidth="14" />
        {/* Orbital trajectory sweep */}
        <path d="M 151 65.5 A 63.5 63.5 0 1 1 166 192.5" />
      </g>
      {/* Orbital terminal satellite node */}
      <circle cx="146.5" cy="64.5" r="13" fill="currentColor" />
    </svg>
  )
}
