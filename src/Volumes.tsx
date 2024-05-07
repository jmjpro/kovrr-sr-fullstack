import {
    useQuery,
} from '@tanstack/react-query'
import { getVolumes } from './data/fetch'
import Pagination from './Pagination'
import type {Volume} from './types'
import './Volumes.css'
import iconShoppingCart from './assets/shopping-cart-icon.svg'

const minThumbnailHeight = 150;
const maxThumbnailHeight = 208;

const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

interface VolumesProps {
    pageSize: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    cartItems: Volume[]
    setCartItems: React.Dispatch<React.SetStateAction<Volume[]>>
}
function Volumes({ pageSize, page, setPage, cartItems, setCartItems }: VolumesProps) {    
    const volumesQuery = useQuery({ queryKey: ['books', pageSize, page], queryFn: () => getVolumes(pageSize, page) })

    if (volumesQuery.isLoading) {
        return <ul className="volumes">
            {[...Array(pageSize)].map((_it, i) => <li key={i} className="skeleton-wrapper">
                <div className="skeleton skeleton-image" style={{ height: `${randomIntFromInterval(minThumbnailHeight, maxThumbnailHeight)}px`}}/>
                <div className="title skeleton skeleton-text"/>
                <button className="add-to-cart">Add to Cart <img src={iconShoppingCart} /></button>
            </li>)}
        </ul>
    }

    if (volumesQuery.isError) {
        console.error(volumesQuery.error)
        return <div>Error retrieving volumes {volumesQuery.error.message}</div>
    }

    if (volumesQuery.data === undefined) {
        return <div>No volumes retrieved</div>
    }

    const {volumes, totalVolumes} = volumesQuery.data

    return <>
        <ul className="volumes">
            {volumes.map((volume) => <li key={volume.bibKey}>
                    <img src={volume.thumbnailUrl} />
                    <div className="title">{volume.title}</div>
                    <button className="add-to-cart" onClick={() => setCartItems([...cartItems, volume])}>Add to Cart <img src={iconShoppingCart} /></button>
                </li>
            )}
        </ul>

        <Pagination numElements={totalVolumes} pageSize={pageSize} page={page} setPage={setPage} />
    </>

}

export default Volumes
