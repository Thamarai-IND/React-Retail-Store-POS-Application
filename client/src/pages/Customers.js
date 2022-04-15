import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import DefaultLayout from '../components/DefaultLayout'
import { EyeOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import {Table } from 'antd';

const Customers = () => {
  const {cartItems} = useSelector(state => state.rootReducer)
  console.log('cartItems = ',cartItems);
  const [billsData, setBillsData] = useState([])
  
  const dispatch = useDispatch()
  const getAllBills = async () => {
    dispatch({ type: 'showLoading' })
    const res = await axios
      .get('/api/bills/get-all-bills')
      .then((response) => {
        dispatch({ type: 'hideLoading' })
        const data = response.data;
        data.reverse()
        setBillsData(response.data)
      })
      .catch((err) => {
        dispatch({ type: 'hideLoading' })
        console.log(err)
      })
  }

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'customerPhoneNumber',
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      render : (value) => (
        <span>{value.toString().substring(0,10)}</span>
      )
    }
  ]
  

  useEffect(() => {
    getAllBills()
  }, [])
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered pagination={false}/>
    </DefaultLayout>
  )
}

export default Customers
