export type MusicLinkMetadata = MusicLinkPure | MusicLinkExtended

export interface MusicLinkPure extends MusicLinkBase {
  useInAPI: false
}

export interface MusicLinkExtended extends MusicLinkBase {
  musicId: string
  musicIdInst: string
  albumId: string
  useInAPI: true
}

interface MusicLinkBase {
  provider: string
  link: string
  useInAPI: boolean
}
