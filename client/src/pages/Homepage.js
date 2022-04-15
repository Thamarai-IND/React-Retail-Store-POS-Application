import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd';
import Items from '../components/Items';
import '../resources/items.css'
import { useDispatch } from 'react-redux';
const Homepage = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('vegetables');
  const categories = [
    {
      name:'fruits',
      image: 'https://images.news18.com/ibnlive/uploads/2022/01/fresh-fruits.jpg'
    },
    {
      name:'vegetables',
      image: 'https://clinicamisalud.org/wp-content/uploads/2020/09/vegetables.jpg'
    },
    {
      name:'meat',
      image: 'https://previews.123rf.com/images/margouillat/margouillat1112/margouillat111200104/11593178-isolated-raw-meat-beef.jpg'
    }
  ]
  const dispatch = useDispatch();
  const getAllItems = async () => {
    dispatch({type:'showLoading'})
    const res = await axios.get('/api/items').then((response)=> {
      dispatch({type:'hideLoading'})
      setItems(response.data)
    }).catch((err)=>{
      dispatch({type:'hideLoading'})
      console.log(err);
    })
  }  
  useEffect(()=>{
    getAllItems();
  },[])
  return (
    <div>
      <DefaultLayout>

        <div className='d-flex categories'>
          {categories.map((category)=> {
            return (
              <div 
                onClick={()=>setSelectedCategory(category.name)}
                className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                <h4>{category.name}</h4>
                <img src={category.image} height='60' width='80' />
              </div>
            )
          })}
        </div>
        <Row gutter={20}>
          {
            items.filter((i)=>i.category===selectedCategory).map((item)=>{
              return <Col span={6} xs={24} lg={6} md={12} sm={6}>
                <Items item={item}/>
              </Col>
            })
          }
        </Row>
      </DefaultLayout>
    </div>
  )
}

export default Homepage
