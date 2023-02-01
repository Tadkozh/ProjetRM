import { useAuth } from '../../context/AuthContext'
import { Box, Typography } from '../ui'

import FavoriteIcon from './FavoriteIcon'
import InfoGalery from './InfoGalery'
import { GlobalRating } from './RatingInfos'
import StatsDropdowns from '../stats/StatsDropdowns'

function InfoPresentation({ info }) {
  const { data: authUser, setData } = useAuth()

  return (
    info && (
      <>
        <Typography
          component="h2"
          variant="h3"
          sx={{ textAlign: 'center', m: '0 auto' }}
        >
          {info.title.romaji ?? info.title.english}
        </Typography>
        <Typography>{info.title.native}</Typography>

        <InfoGalery info={info} />

        <FavoriteIcon info={info} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            gap: '10px',
            mt: '10px',
          }}
        >
          <GlobalRating info={info} />
          {authUser ? (
            <StatsDropdowns
              userDatas={authUser}
              contentInfos={info}
              setData={setData}
            />
          ) : null}
        </Box>
      </>
    )
  )
}

export default InfoPresentation
