import { auth, get } from '@upstash/redis'

import type { NextApiRequest, NextApiResponse } from 'next'
import { ChartAPIResponse } from '../../structs/chart'

auth(process.env.REDIS_ENDPOINT, process.env.REDIS_PASS)

export const getChartData = async (): Promise<ChartAPIResponse> => {
  let musicsResponse = await get('chartMusics')
  let chartResponse = await get('chartDatas')

  if (musicsResponse.error || chartResponse.error) {
    return {
      status: 'error',
      message: musicsResponse.error || chartResponse.error || '알 수 없는 오류.',
    }
  }

  return {
    status: 'success',
    data: {
      musics: JSON.parse(musicsResponse.data),
      charts: JSON.parse(chartResponse.data)
    },
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChartAPIResponse>
) {
  const data = await getChartData()

  res.status(200).json(data)
}
