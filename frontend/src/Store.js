import React, { useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import tenet from './img/tenet.jfif'
import fivepointsomeone from './img/fivepointsomeone.jpg'
import percyjackson from './img/percyjackson.jfif'

const API_URL = 'http://localhost:4000'

const ITEMS = [
  {
    id: 1,
    genre: 'fictional',
    price: ethers.utils.parseEther('10'),
    name: 'TENET',
    image: tenet
  },
  {
    id: 2,
    genre: 'fictional',
    price: ethers.utils.parseEther('20'),
    name: 'FIVE POINT SOMEONE',
    image: fivepointsomeone
  },
  {
    id: 3,
    genre: 'horror',
    price: ethers.utils.parseEther('5'),
    name: 'PERCY JACKSON',
    image: percyjackson
  },
  {
    id: 4,
    genre: 'horror',
    price: ethers.utils.parseEther('5'),
    name: 'PERCY JACKSON',
    image: percyjackson
  },
  {
    id: 5,
    genre: 'horror',
    price: ethers.utils.parseEther('5'),
    name: 'PERCY JACKSON',
    image: percyjackson
  },
  {
    id: 6,
    genre: 'horror',
    price: ethers.utils.parseEther('5'),
    name: 'PERCY JACKSON',
    image: percyjackson
  },

]

function Store({ paymentProcessor, dai }) {
  const [filter, setFilter] = useState('all')

  const filteredItems = filter === 'all'
    ? ITEMS
    : ITEMS.filter(item => item.genre === filter)

  const buy = async item => {
    const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`)
    const tx1 = await dai.approve(paymentProcessor.address, item.price)
    await tx1.wait()

    const tx2 = await paymentProcessor.pay(item.price, response1.data.paymentId)
    await tx2.wait()

    await new Promise(resolve => setTimeout(resolve, 5000))

    const response2 = await axios.get(`${API_URL}/api/getItemUrl/${response1.data.paymentId}`)
    console.log(response2)
    alert(response2.data.url)
  }

  return (
    <>
      <h3 className='heading'>Our Products</h3>
      <select className='filter' name='genre' id='genre' onChange={e => setFilter(e.target.value)}>
        <option value='fictional'>Fictional</option>
        <option value='horror'>Horror</option>
        <option value='all'>All</option>
      </select>

      <ul className='flexbox'>
        {filteredItems.map(item => (
          <li key={item.id} className='product' style={{ display: filter !== 'all' && item.genre !== filter ? 'none' : 'block' }}>
            <img className='product-img' src={item.image} alt={item.name} />
            <div className='description'>{item.name}</div>
            <h2 className='rate'>{item.price.toString().substring(0,2)} DAI</h2>
            <button type='button' className='btngetstarted' onClick={() => buy(item)}>
              Buy
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Store

// const API_URL = 'http://localhost:4000'

// const ITEMS = [
//     {
//         id: 1,
//         price: ethers.utils.parseEther('10')
//     },
//     {
//         id: 2,
//         price: ethers.utils.parseEther('20')
//     },
//     {
//         id: 3,
//         price: ethers.utils.parseEther('5')
//     },
//     {
//         id: 4,
//         price: ethers.utils.parseEther('15')
//     },
//     {
//         id: 5,
//         price: ethers.utils.parseEther('25')
//     }
// ]

// function Store({ paymentProcessor, dai }) {

//     const buy = async item => {
//         const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`)
//         const tx1 = await dai.approve(paymentProcessor.address, item.price)
//         await tx1.wait()

//         const tx2 = await paymentProcessor.pay(item.price, response1.data.paymentId)
//         await tx2.wait()

//         await new Promise(resolve => setTimeout(resolve, 5000))

//         const response2 = await axios.get(`${API_URL}/api/getItemUrl/${response1.data.paymentId}`)
//         console.log(response2)
//         alert(response2.data.url)
//     }
//     const [filter, setFilter] = useState("");

//     return (<>
//         <h3 className='heading'>Our Products</h3>
//         <select className='filter' name="genre" id="genre">
//             <option value="fictional">Fictional</option>
//             <option value="horror">Horror</option>
//             <option value="all">All</option>
//         </select>

//         <ul className='flexbox'>

//             <li className='product'>
//                 <img className='product-img' src={tenet} />
//                 <div className='description'>TENET</div>
//                 <h2 className="rate">10 DAI</h2>
//                 <button type='button' className='btngetstarted' onClick={() => buy(ITEMS[0])} >
//                     Buy
//                 </button>
//             </li>

//             <li className='product'>
//                 <img className='product-img' src={fivepointsomeone} />
//                 <div className='description'>FIVE POINT SOMEONE</div>
//                 <h2 className="rate">20 DAI</h2>
//                 <button type='button' className='btngetstarted' onClick={() => buy(ITEMS[1])} >
//                     Buy
//                 </button>
//             </li>
//             <li className='product'>
//                 <img className='product-img' src={fivepointsomeone} />
//                 <div className='description'>FIVE POINT SOMEONE</div>
//                 <h2 className="rate">20 DAI</h2>
//                 <button type='button' className='btngetstarted' onClick={() => buy(ITEMS[1])} >
//                     Buy
//                 </button>
//             </li>
//             <li className='product'>
//                 <img className='product-img' src={fivepointsomeone} />
//                 <div className='description'>FIVE POINT SOMEONE</div>
//                 <h2 className="rate">20 DAI</h2>
//                 <button type='button' className='btngetstarted' onClick={() => buy(ITEMS[1])} >
//                     Buy
//                 </button>
//             </li>
//             <li className='product'>
//                 <img className='product-img' src={fivepointsomeone} />
//                 <div className='description'>FIVE POINT SOMEONE</div>
//                 <h2 className="rate">20 DAI</h2>
//                 <button type='button' className='btngetstarted' onClick={() => buy(ITEMS[1])} >
//                     Buy
//                 </button>
//             </li>

//             <li className='product'>
//                 <img className='product-img' src={percyjackson} />
//                 <div className='description'>PERCY JACKSON</div>
//                 <h2 className="rate">5 DAI</h2>
//                 <button type='button' className='btngetstarted' onClick={() => buy(ITEMS[2])} >
//                     Buy
//                 </button>
//             </li>
//         </ul>
//     </>
//     )
// }

// export default Store;