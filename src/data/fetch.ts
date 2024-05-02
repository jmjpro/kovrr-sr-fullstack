import { Volume } from '../types'

async function getVolumes(pageSize: number, page?: number): Promise<{
  volumes: Volume[],
  totalVolumes: number,
}> {
  // TODO: load this from an configuration-provided variable
  const apiUrl = /* process.env.NODE_ENV === 'production' ? 'https://books.google.com/books\?jscmd\=ClBrowse\&hl\=en\&as_coll\=1001\&start\=0\&num\=100\&uid\=100550515361463032088' :*/ '/api'
  const res = await fetch(apiUrl)
  const books = await res.json()
  
  const volumes: Volume[] = books.volumes.map((it: any) => {
    const volume: Volume = {
      bibKey: it.bib_key,
      thumbnailUrl: it.thumbnail_url,
      title: it.title,
    }
    return volume
  });

  let i = 0
  while (volumes.length < 50) {
    // console.log(volumes)
    volumes.push(...volumes.map(it => ({...it, bibKey: it.bibKey + i})))
    i++
  }

  const calculatedPage = page || 0
  return {
    volumes: volumes.slice(calculatedPage * pageSize, (calculatedPage + 1) * pageSize),
    totalVolumes: volumes.length,
  }
}

export { getVolumes }
