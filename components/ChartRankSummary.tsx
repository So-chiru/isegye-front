import { ChartDatasAPI } from '../structs/chart'

import styles from '../styles/components/ChartRankSummary.module.css'

interface ChartRankSummaryProps {
  data?: ChartDatasAPI
}

export const Empty = () => {
  return <div className={styles.id}>아직 차트에 없어요... 분발합시다!</div>
}

const ProvidersName: { [index: string]: string } = {
  bugs: '벅스',
  melon: '멜론',
  vibe: 'VIBE',
  applemusic: 'Apple Music',
}

export const ChartRankSummary = ({ data }: ChartRankSummaryProps) => {
  console.log(data)

  return (
    <>
      <h1>실시간 차트 (2분 반영)</h1>

      <div className={styles.grid}>
        {data &&
          data.current &&
          data.current.hourly &&
          Object.keys(data.current.hourly.providers).map(v => {
            const d = data.current.hourly!.providers[v]

            return (
              <>
                {d.map(a => (
                  <a
                    href='https://www.melon.com/chart/'
                    key={`top-${a.id}`}
                    className={styles.card}
                  >
                    <h2>{ProvidersName[v] || v} &rarr;</h2>
                    <p>
                      {a.title} <br></br>
                      <span className={styles.rank}>
                        {`#${a.rank}` || '-위'}
                      </span>
                    </p>
                  </a>
                ))}
              </>
            )
          })}
      </div>

      <br></br>

      <h1>일간 차트 (1시간 반영)</h1>

      <div className={styles.grid}>
        {data &&
        data.current &&
        data.current.daily &&
        data.current.daily.providers.length ? (
          Object.keys(data.current.daily.providers).map(v => {
            const d = data.current.daily!.providers[v]

            return (
              <>
                {d.map(a => (
                  <a
                    href='https://www.melon.com/chart/'
                    key={`top-${a.id}`}
                    className={styles.card}
                  >
                    <h2>{ProvidersName[v] || v} &rarr;</h2>
                    <br></br>
                    <p>
                      {a.title}{' '}
                      <span className={styles.rank}>
                        {`#${a.rank}` || '-위'}
                      </span>
                    </p>
                  </a>
                ))}
              </>
            )
          })
        ) : (
          <Empty></Empty>
        )}
      </div>
    </>
  )
}

export default ChartRankSummary
