import { MusicLinkMetadata } from './music'

interface ChartMusicsAPI {
  links: MusicLinkMetadata[]
}

interface ChartProviderData {
  name: string
  rank: number
  range?: string
}

export interface AppendData {
  date: string
  [key: string]: unknown
}

export interface RankSongData {
  id: number
  rank: number
  title: string
  artist: string
}

export interface ChartData {
  providers: {
    [key: string]: RankSongData[]
  }
  date: string
}

export type DataTypeKey = 'hourly' | 'daily'

export interface ChartDatasAPI {
  current: {
    hourly?: ChartData
    daily?: ChartData,
    updateAt: number
  },
  top: {
    hourly?: ChartData
    daily?: ChartData,
    updateAt: number
  },
  history: {
    hourly?: ChartData[]
    daily?: ChartData[],
    updateAt: number
  }
}

export interface ChartAPIData {
  musics: ChartMusicsAPI
  charts: ChartDatasAPI
}

interface ChartAPISuccess {
  status: 'success'
  data: ChartAPIData
}

interface ChartAPIError {
  status: 'error'
  message?: string
  data?: ChartAPIData
}

export type ChartAPIResponse = ChartAPISuccess | ChartAPIError

export interface ChartRankSummaryData {
  current: number
  top?: number
}
