import { useEffect, useState } from 'react'

const breakpoints = {
  // Numerical values will result in a min-width query
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200,
  // String values will be used as is
  tallPhone: '(max-width: 360px) and (min-height: 740px)'
}

const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  let prefix = typeof breakpoints[label] === 'string' ? '' : 'min-width:'
  let suffix = typeof breakpoints[label] === 'string' ? '' : 'px'
  accumulator[label] = cls =>
    `@media (${prefix + breakpoints[label] + suffix}) {
        ${cls};
      }`
  return accumulator
}, {})

const useMedia = (query, defaultState) => {
  const [state, setState] = useState(defaultState)

  useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    const onChange = () => {
      if (!mounted) return
      setState(!!mql.matches)
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

export const useMediaMin = (bp, defaultState) =>
  useMedia(`(min-width: ${breakpoints[bp]}px)`, defaultState)

export const useMediaMax = (bp, defaultState) =>
  useMedia(`(max-width: ${breakpoints[bp] - 1}px)`, defaultState)

export default mq
