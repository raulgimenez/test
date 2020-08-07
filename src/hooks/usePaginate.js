
export default function usePaginate(data=[], page=1, items=5, infinite=true) {
    
    const fromSlice = (infinite ? 0 : (page-1) * items)
    const toSlice = (page*items)

    return data.slice(fromSlice, toSlice)
}
