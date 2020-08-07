import React from 'react'
import './Welcome.css'
import FavFilled from '../images/fav_filled.svg'
import FavEmpty from '../images/fav_empty.svg'
import {Alert, Form} from 'react-bootstrap'

const Welcome = ({data, favs, setFavs, unsetFavs, onOrder}) => {

    const handleSetFavs = (event) => {
        
        const selectedItem = parseInt(event.target.dataset.id)
        if (!favs.includes(selectedItem)) {
            setFavs(selectedItem)  
        } else {
            unsetFavs(selectedItem)
        } 
    }

    const handleOrder = (event) => {
        const orderBy= event.target.value;
        onOrder(orderBy);
    }

    return (
            <main>
                <section className='container-md home-section'>
                        <div className="home-section-wrapper container-bootstrap ">
                            <h2 className="home-section-title">
                                Esta es  tu lista de productos
                            </h2>
                            <div className="home-section-subtitle">
                                Más de 19 artículos para hacer el frontend tech test
                            </div>
                        </div>
                        {data.length <= 0 &&
                        <>
                            <Alert variant="warning" className="aire">
                                Ningún Resultado!
                            </Alert>
                        </>
                        }
                        {data.length > 0 &&
                        <>
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom" onChange={handleOrder} >
                                    <Form.Label>Order By</Form.Label>
                                    <Form.Control as="select" custom>
                                    <option value="none">Select Attribute to order</option>
                                    <option value="title">Title</option>
                                    <option value="description">Description</option>
                                    <option value="price">Price</option>
                                    <option value="email">Email</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </>
                        }
                        <div className="card-columns home-subsection">
                        {data.map(item => (
                            <div className="card" key={item.id}>
                                <img className="card-img-top" src={item.image} alt={`Card ${item.name}`} />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <a onClick={handleSetFavs} data-id={item.id} >
                                            <img className="card-img-fav" src={favs.indexOf(item.id) >= 0 ? FavFilled : FavEmpty} alt="Favorite Icon" data-id={item.id}/>
                                        </a>
                                        {item.title}
                                    </h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text item-price">{item.price} €</p>
                                    <footer className="blockquote-footer">
                                        <small className="text-muted">
                                        {item.email}
                                        </small>
                                    </footer>
                                </div>
                          </div>
                        ))}
                        </div>
                </section>
            </main>
    )
}

export default Welcome