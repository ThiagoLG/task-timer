import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em: </label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        {...register('task')}
        disabled={!!activeCycle}
      />
      <datalist id="task-suggestions">
        <option value="Estudar Programação" />
        <option value="Estudar investimentos" />
        <option value="Estudar Inglês" />
        <option value="Trabalhar" />
        <option value="Tempo de Descanso contado" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        min={1}
        max={60}
        step={5}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormContainer>
  )
}
