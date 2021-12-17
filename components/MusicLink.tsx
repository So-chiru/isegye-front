import { MusicLinkMetadata } from '../structs/music'
import styles from '../styles/components/MusicLinks.module.css'

interface MusicLinksProps {
  data: MusicLinkMetadata[]
}

export const MusicLinks = ({ data }: MusicLinksProps) => {
  return (
    <section>
      <div className={styles.links}>
        {data && data.map(v => (
          <a
            key={`music-link-${v.provider}`}
            href={v.link}
            className={styles.card}
          >
            <h2>{v.provider}에서 듣기 &rarr;</h2>
          </a>
        ))}
      </div>
    </section>
  )
}

export default MusicLinks
