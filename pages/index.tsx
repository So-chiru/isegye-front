import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import ChartRankSummary from '../components/ChartRankSummary'
import { getChartData } from './api/chart'
import MusicLinks from '../components/MusicLink'
import { ChartAPIData, ChartAPIResponse } from '../structs/chart'

interface Props {
  data: ChartAPIData
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getChartData()

  return {
    props: { data },
  }
}

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>RE:WIND 차트</title>
        <meta
          name='description'
          content='이세계 아이돌 곡 - RE : WIND의 차트 순위를 위한 헌정 페이지입니다.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* <p>{JSON.stringify(data, null, 2)}</p> */}

      <main className={styles.main}>
        <Image
          src='/rewind.jpg'
          width='300px'
          height='300px'
          alt='로고'
        ></Image>
        <h1 className={styles.title}>RE:WIND 차트</h1>
        {(data as ChartAPIResponse).data && (
          <MusicLinks
            data={(data as ChartAPIResponse).data!.musics.links}
          ></MusicLinks>
        )}

        <hr></hr>

        <ChartRankSummary
          data={(data as ChartAPIResponse).data!.charts}
        ></ChartRankSummary>
      </main>
    </div>
  )
}

export default Home
