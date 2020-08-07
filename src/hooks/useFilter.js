export default function useFilter(data, filter) {
    const _filter = new RegExp('' + filter, 'gi')
    const filteredData =  data.filter(function(item) {
        return      _filter.test(item.title) 
                ||  _filter.test(item.description) 
                ||  _filter.test(item.price)
                ||  _filter.test(item.email);
    })
    return {filteredData}

}
