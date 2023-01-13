import { useEffect, useState } from 'react'
import axios from 'axios'
import { AccordionBasic } from './AccordionBasic'

export const NewsById = () => {
  const [animeNews, setAnimeNews] = useState([])

  // https://api.jikan.moe/v4/anime/${id}/news
  //https://api.jikan.moe/v4/manga/{id}/news

  const APP_API_URL = 'https://api.jikan.moe/v4'
  const endpoint = 'news'
  const id = 1 // id : 1, 190 : No news Manga
  const params = 'anime' // params : anime, manga

  // const clientApi = (endpoint = null, params = {}) => {
  //   return axios
  //     .get(${url}/${params}/${endpoint})
  //     .then((data) => data)
  //     .catch((error) => error)
  // }

  const getDataFromApi = () => {
    axios
      .get(`${APP_API_URL}/${params}/${id}/${endpoint}`)
      .then((response) => {
        console.log(`${APP_API_URL}/${params}/${id}/${endpoint}`)
        console.log(response.data.data)
        setAnimeNews(response.data.data)
      })
      .catch((error) => error)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  return (
    <>
      <h2>News about this {params}</h2>

      <div>
        {animeNews ? (
          <div>
            <p>(click on a title to learn more)</p>

            {animeNews.map((data, index) => {
              return (
                <div key={index}>
                  <AccordionBasic data={data} />
                </div>
              )
            })}
          </div>
        ) : (
          <p>No news about this {params}</p>
        )}
      </div>
    </>
  )
}
