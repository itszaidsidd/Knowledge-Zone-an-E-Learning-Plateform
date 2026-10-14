import React from 'react'


const Card = (props) => {
  return (
    <div  className='card'>
      <img src={props.cardImg} alt="" />
      <h3 className='card-title'>{props.title}</h3>
      <p className="card-content">{props.content}</p>
      <div className="card-footer">
        <span>
            Price : <s>₹ {props.originalPrice} </s> ₹ {props.price}
        </span>
        <button className='btn'>Enroll</button>
      </div>
    </div>
  )
}

export default Card
