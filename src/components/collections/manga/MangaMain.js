import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS Files
import '../pageInfo.css'
import '../pageInfo450px.css'
import '../pageInfo600px.css'
import '../pageInfo800px.css'
import '../pageInfo1024px.css'

// Components
import NavBarInfo from '../NavBarInfo'
import MangaPresentation from './MangaPresentation'
import Synopsis from '../Synopsis'
import MangaDetails from './MangaDetails'
import Story from '../Story'
import Form from '../Form'
import Reviews from '../Reviews'

function MangaMain() {
  let { id } = useParams()

  const collectionType = 'manga' // collectionType : anime, manga

  const linkInfo = `https://api.jikan.moe/v4/${collectionType}/${id}/full`
  const [getInfo, setGetInfo] = useState(null)

  useEffect(() => {
    fetch(linkInfo)
      .then((res) => res.json())
      .then((data) => setGetInfo(data))
  }, [linkInfo])

  return (
    <>
      <NavBarInfo collectionType={collectionType} />
      <div className="infoWrapper">
        {getInfo?.data ? (
          <>
            <div className="info">
              <div className="infoRow1">
                <MangaPresentation getInfo={getInfo} />
                <Synopsis getInfo={getInfo} />
                <MangaDetails getInfo={getInfo} />
              </div>
              <Story getInfo={getInfo} />
              <Form />
              <Reviews id={id} />
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default MangaMain
