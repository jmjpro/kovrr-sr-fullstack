import { Volume } from '../types'

async function getVolumes(pageSize: number, page?: number): Promise<{
  volumes: Volume[],
  totalVolumes: number,
}> {
  const res = await fetch('/api') // see /vite.config.js and /vercel.json, respectively, for where this path is proxied to a Google Books API in dev and production 
  const books = await res.json()
  
  const volumes: Volume[] = books.volumes.map((it: any) => {
    const volume: Volume = {
      bibKey: it.bib_key,
      thumbnailUrl: it.thumbnail_url,
      title: it.title,
    }
    return volume
  });

  // this is a programmatic way to create test data
  // if we have less than 50 volumes in our catalog, we duplicate them until we get above 50 results
  let i = 0
  while (volumes.length < 50) {
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
