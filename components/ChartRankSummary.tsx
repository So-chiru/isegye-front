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

const ProvidersLink: { [index: string]: string } = {
  'bugs.r': 'https://music.bugs.co.kr/chart/track/realtime/total',
  'bugs.d': 'https://music.bugs.co.kr/chart/track/day/total',
  'melon.r': 'https://www.melon.com/chart/index.htm',
  'melon.d': 'https://www.melon.com/chart/day/index.htm',
  'vibe.r': 'https://vibe.naver.com/chart/total',
  'vibe.d': 'https://vibe.naver.com/chart/total',
  'applemusic.r': 'https://music.apple.com/kr/playlist/%EC%98%A4%EB%8A%98%EC%9D%98-top-100-%EA%B8%80%EB%A1%9C%EB%B2%8C/pl.d25f5d1181894928af76c85c967f8f31',
  'applemusic.d': 'https://music.apple.com/kr/playlist/%EC%98%A4%EB%8A%98%EC%9D%98-top-100-%EA%B8%80%EB%A1%9C%EB%B2%8C/pl.d25f5d1181894928af76c85c967f8f31',
  'flo.r': 'https://www.music-flo.com/browse?chartId=1',
  'flo.d': 'https://www.music-flo.com/browse?chartId=1',
}

export const ChartRankSummary = ({ data }: ChartRankSummaryProps) => {
  console.log(data)

  return (
    <>
      <h2>실시간 100 차트 <span className={styles.small}>(2분마다 갱신, 업데이트는 1시간)</span></h2>

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
                    href={ProvidersLink[v + '.r']}
                    key={`top-${a.id}`}
                    className={styles.card}
                  >
                    <h2>{a.cname || ProvidersName[v] || v} &rarr;</h2>
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

      <h2>데일리 차트 <span className={styles.small}>(1시간마다 갱신)</span></h2>

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
                    href={ProvidersLink[v + '.d']}
                    key={`top-${a.id}`}
                    className={styles.card}
                  >
                    <h2>{a.cname || ProvidersName[v] || v} &rarr;</h2>
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
