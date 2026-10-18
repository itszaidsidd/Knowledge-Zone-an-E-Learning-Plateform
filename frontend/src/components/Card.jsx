import React from 'react'
import { useNavigate } from 'react-router-dom'


const Card = (props) => {
  const navigate=useNavigate()

  return (
    <div  className='card'>
      <img src={props.cardImg} alt="" />
      <h3 className='card-title'>{props.title}</h3>
      <p className="card-content">{props.content}</p>
      <div className="card-footer">
        <span>
            Price : <s>₹ {props.originalPrice} </s> ₹ {props.price}
        </span>
        <button className='btn' onClick={()=>navigate(`course-detail/${props.id}`)}>Enroll</button>
      </div>
    </div>
  )
}

export default Card
