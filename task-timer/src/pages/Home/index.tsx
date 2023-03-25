// #region ***** Imports *****
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { createContext, useState } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
// #endregion ** Imports *****

// #region ***** Typings/Validations *****
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ter no mínimo 5 mimutos.')
    .max(60, 'O ciclo deve ter no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// #endregion ** Typings/Validations *****

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  // #region ***** States/Hooks *****
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  // #endregion ** States/Hooks *****

  // #region ***** Aux Functions, Variables and Controllers *****
  const { handleSubmit, watch, reset } = newCycleForm
  const task = watch('task')
  const isSubmitDisabled = !task

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // #endregion ** Aux Functions, Variables and Controllers *****

  // #region ***** Form handlers *****
  function handleCreateNewCicle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }
  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }
  // #endregion ** Form handlers *****

  // #region ***** Component render *****
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm width={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play width={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
  // #endregion ** Component render *****
}
