import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useSticky from './hooks/useSticky'
import useInfiniteScroll from './hooks/useInfiniteScroll'
import usePaginate from './hooks/usePaginate'
import useFilter from './hooks/useFilter'
import useSort from './hooks/useSort'
import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import IconAuthor from './components/IconAuthor'
import {Modal, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import FavFilled from './images/fav_filled.svg'

function App() {
  const [data, setData] = useState([]);
  const [page, _setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [favs, _setFavs] = useState([]);
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState('none');
  const { isSticky, element } = useSticky()
  const { filteredData } = useFilter(data, filter)
  const orderedData = useSort(filteredData, sort)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json',
      );
      setData(result.data.items.map((item, index) => { return {...item, id: index} })  );
    };
 
    fetchData();
  }, []);

  const myPageRef = React.useRef(page);
  const setPage = data => {
    myPageRef.current = data;
    _setPage(data);
  };

  const setFavs = data => {
    _setFavs(oldArray => {
        return [...oldArray, data]
    });
  };
  const unsetFavs = (data) => {
    _setFavs(favs.filter(item=>item!==data));
  };

  const onInfiniteScrollHandler = () => {
    setPage(myPageRef.current+1)
  }

  useInfiniteScroll(onInfiniteScrollHandler)

  const onChangeFilterHandler = (filter) => {
    setFilter(filter)
  }

  const addFavsHandler = (myfav) => {
    setFavs(parseInt(myfav))
  }
  const removeFavsHandler = (myfav) => {
    unsetFavs(parseInt(myfav))
  }

  const handleunSetFavs = (event) => {
    const selectedItem = parseInt(event.target.dataset.id)
    unsetFavs(parseInt(selectedItem))
  }

  const handlerOrderBy = (order) => {
    setSort(order)
  }


  return (
    <>
      <Navbar sticky={isSticky} onChangeFilter={onChangeFilterHandler} onClickFav={handleShow}/>
      <Welcome element={element} data={ usePaginate(orderedData, page)} favs={favs} setFavs={addFavsHandler} unsetFavs={removeFavsHandler} onOrder={handlerOrderBy}/>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="card-columns home-subsection">
          {data.filter((item)=>{return favs.includes(item.id)}).map(item => (
              <div className="card" key={item.id}>
                  <img className="card-img-top" src={item.image} alt={`Card ${item.name}`} />
                  <div className="card-body">
                  <h6 className="card-title">
                      <a onClick={handleunSetFavs} data-id={item.id}>
                          <img className="card-img-fav" src={FavFilled} alt="Favorite Icon" data-id={item.id}/>
                      </a>
                      {item.title}
                  </h6>
                  </div>
            </div>
          ))}
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <IconAuthor />
    </>
  )
}

export default App