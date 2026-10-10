import React from 'react'
import Image from 'next/image'
import { BrandIcon } from '@/components/brand-icon'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
  variant?: 'mark' | 'full' | 'image'
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({
  className,
  showText = true,
  variant = 'mark',
  size = 'md',
}: LogoProps) {
  if (variant === 'image') {
    const heightMap = {
      sm: 'h-6',
      md: 'h-8',
      lg: 'h-10',
    }
    return (
      <div className={cn('relative inline-flex items-center', className)}>
        <Image
          src="/logo-light.png"
          alt="Qod Labs LLP"
          width={180}
          height={67}
          className={cn(heightMap[size], 'w-auto dark:hidden object-contain')}
          priority
        />
        <Image
          src="/logo-dark.png"
          alt="Qod Labs LLP"
          width={180}
          height={67}
          className={cn(heightMap[size], 'w-auto hidden dark:block object-contain')}
          priority
        />
      </div>
    )
  }

  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  }

  const iconInnerSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform duration-fast',
          iconSizes[size]
        )}
      >
        <BrandIcon className={cn('text-white', iconInnerSizes[size])} />
      </div>
      {showText && (
        <span className={cn('font-display font-bold tracking-tight', textSizes[size])}>
          Qod Labs
        </span>
      )}
    </div>
  )
}
