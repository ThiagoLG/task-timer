import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../..'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmountLeft = Math.floor(currentSeconds / 60)
  const secondsAmountLeft = currentSeconds % 60

  const minutes = String(minutesAmountLeft).padStart(2, '0')
  const seconds = String(secondsAmountLeft).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const totalCycleSecondsPassed = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )

        if (totalCycleSecondsPassed >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(totalCycleSecondsPassed)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `Task Timer (${minutes}:${seconds})`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
