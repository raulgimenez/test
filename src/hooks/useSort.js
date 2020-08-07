export default function useSort(data, keySort) {
    if(keySort === 'none') {
        return data
    }

    return data.sort((a, b) =>{
        return (a[keySort] > b[keySort]) ? 1 : -1
    })
}
