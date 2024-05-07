import './Pagination.css'

interface PaginationProps {
    numElements: number
    pageSize: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}
function Pagination({ numElements, pageSize, page, setPage }: PaginationProps) {
    const numPages = Math.floor(numElements / pageSize)
    if (numPages === 1) {
        // don't show any pagination if there's only one page of results
        return null
    }
    
    return <ul className="pagination">
        { // only render a "Previous" button if we're not showing the first page of results
            page >= 1 && <button className="link" onClick={() => setPage(page - 1)}>Previous</button>
        }

        { // render buttons to allow navigation between pages; the current page is displayed as text instead of a button
            [...Array(numPages)].map((_it, i) => <li key={i} className="page">
                {page === i
                    ? <span>{i + 1}</span>
                    : <button className="link" onClick={() => setPage(i)}>{i + 1}</button>}
            </li>)
        }

        { // only render a "Next" button if we're not showing the last page of results
            page < numPages - 1 && <button className="link" onClick={() => setPage(page + 1)}>Next</button>
        }
    </ul>
}

export default Pagination
