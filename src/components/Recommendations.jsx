import { useParams, Link } from 'react-router-dom'
import '../styles/recommendations.css'
import {
  ArrowRightSharp,
  Button,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Paper,
} from './ui'
import { useInfos } from '../hooks/queriesHooks'
import { useRecommendation } from '../hooks/queriesHooks'

// Components
import NavBarInfoTabs from './NavBarInfoTabs'
import { getUrl } from '../utils/helper'
import { INFOS } from '../commons/constants'

const Recommendations = () => {
  let { type, id } = useParams()

  const { data: recommendations, status: statusRecom } = useRecommendation(
    type,
    id,
  )
  console.log('recommendations', recommendations)
  console.log('statusRecom', statusRecom)

  const { data: titlehook, status: statusTitle } = useInfos(type, id)
  console.log('titlehook', titlehook)
  console.log('statusTitle', statusTitle)
  const title = titlehook?.title

  let directives = ''
  if (recommendations?.length === 0) {
    directives = `No recommendation about ${title}`
  } else {
    directives = (
      <>
        <Typography
          sx={{
            display: 'flex',
            alignItem: 'center',
          }}
        >
          <ArrowRightSharp />
          Click on Read More to see the article on MyAnimeList
        </Typography>
        <Typography
          sx={{
            marginBottom: 5,
            display: 'flex',
            alignItem: 'center',
          }}
        >
          <ArrowRightSharp />
          Click on the image to see the card
        </Typography>
      </>
    )
  }

  return (
    <>
      <NavBarInfoTabs />

      <Box sx={{ padding: 6 }}>
        <Typography variant="h4" component="h2">
          People who like <i>{title}</i> also enjoy
        </Typography>
        {directives}

        <div className="datagrid">
          {recommendations
            ? recommendations.map((data, index) => {
                if (index < 12) {
                  return (
                    <div key={index}>
                      <Paper elevation={24}>
                        <Card sx={{ maxWidth: 225 }}>
                          <Link to={getUrl(type, INFOS, [data.entry.mal_id])}>
                            <CardMedia
                              height={335}
                              component="img"
                              image={data.entry.images.jpg.image_url}
                              alt={data.entry.title}
                            />
                          </Link>
                          <CardContent sx={{ height: 140 }}>
                            <Typography
                              variant="h6"
                              component="h3"
                              sx={{ height: 64, textAlign: 'center' }}
                            >
                              {data.entry.title}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Button
                                variant="contained"
                                href={data.entry.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Read more
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Paper>
                    </div>
                  )
                }
                return null
              })
            : 'loading, please wait...'}
        </div>
      </Box>
    </>
  )
}

export default Recommendations
