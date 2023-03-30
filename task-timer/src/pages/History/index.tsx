import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'

export function History() {

  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duraçãp</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              cycles.map(cycle => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount}</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startedAt), {
                        addSuffix: true
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (<Status statusColor='green'>Concluído</Status>)}
                      {cycle.interruptedDate && (<Status statusColor='red'>Interrompido</Status>)}
                      {!cycle.finishedDate && !cycle.interruptedDate && (<Status statusColor='yellow'>Em andamento</Status>)}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
