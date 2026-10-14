import React from 'react'
import Card from './Card'

import card1Img from "../assets/images/ai.jpg"
import card2Img from "../assets/images/guitar.jpg"
import card3Img from "../assets/images/python.jpg"

const PopuarCourses = () => {
  return (
    <div className='popular-courses'>
      <div className="tag-line">
        <ul>
            <li>100+ Online Courses</li>
            <li>Expert Instructions</li>
            <li>Lifetime Access</li>
            <li>Money Back Guarted</li>
        </ul>
      </div>
      <h1>Popular Courses</h1>
      <div className="cards">
        <Card title="Learn Ai in Easy way" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. " cardImg={card1Img} price={1500} originalPrice={2000}/>
        <Card title="Learn Guitar easy way" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. " cardImg={card2Img} price={1800} originalPrice={2500}/>
        <Card title="Learn Python" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. " cardImg={card3Img} price={1000} originalPrice={1500}/>
        <Card title="Learn Ai in Easy way" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. " cardImg={card1Img} price={1500} originalPrice={2000}/>
        <Card title="Learn Guitar easy way" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. " cardImg={card2Img} price={1800} originalPrice={2500}/>
        <Card title="Learn Python" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. " cardImg={card3Img} price={1000} originalPrice={1500}/>
      </div>
      <button className="btn-view">View All Courses</button>
    </div>
  )
}

export default PopuarCourses
