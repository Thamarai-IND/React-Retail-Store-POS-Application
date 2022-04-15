import { Button, Modal, Table, Form, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout';
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CartPage = () => {
    const {cartItems} = useSelector(state => state.rootReducer)
    console.log(cartItems);
    const [billChargeModel, setBillChargeModel] = useState(false)
    const [subTotal, setSubTotal] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const refreshPage = () => {
        window.location.reload(false);
    }
    const increaseQuantity = (record) => {
        dispatch({type : 'updateCart', payload : {...record, quantity:record.quantity+1},})
        // window.location.reload(true);
    }
    const decreaseQuantity = (record) => {
        if(record.quantity!==1) {
            dispatch({type : 'updateCart', payload : {...record, quantity:record.quantity-1},})
        }
    }
    const deleteFromCart = (record) => {
        dispatch({type : 'deleteFromCart', payload : record})
    }
    
    const columns = [
        {
            title : "Name",
            dataIndex : "name"
        },
        {
            title : 'Image',
            dataIndex : "image",
            render : (image, record) => <img src={image} alt="" height='60' width='60'/>
        },
        {
            title : "Price",
            dataIndex : "price"
        },
        {
            title : "Quantity",
            dataIndex:'_id',
            render : (_id, record) => <div>
                <PlusCircleOutlined className='mx-3' onClick={() => {
                        increaseQuantity(record)
                        }
                    } />
                <b>{record.quantity}</b>
                <MinusCircleOutlined className='mx-3'onClick={() => {
                    decreaseQuantity(record) 
                    }
                } />
            </div>
        },
        {
            title : "Actions",
            dataIndex : "_id",
            render : (_id,record) => <DeleteOutlined onClick={() => deleteFromCart(record)}/>
        }
    ]

    useEffect(()=>{
        let temp =0;
        cartItems.forEach((item) => {
            temp= temp+ (item.price * item.quantity)
            
        });
        setSubTotal(temp);
    },[cartItems])

    const onFinish = (values) => {
        const reqObject = {
            ...values,
            subTotal,
            tax : Number((subTotal / 100) * 10).toFixed(2),
            totalAmount : Number(subTotal + Number(((subTotal / 100) * 10).toFixed(2))),
            userId : JSON.parse(localStorage.getItem('pos-user'))._id
        }
        //console.log(reqObject);
        axios.post('/api/bills/charge-bill',reqObject).then((res) => {
            message.success('Bill charged successfully');
            navigate('/bills')
            console.log(res);
        }).catch(()=>{
            message.error('bill not charged')
        })
    }
  return (
    <DefaultLayout>
        <h3>cart</h3>
        <Table columns={columns} dataSource={cartItems} bordered pagination={false}/>
        <hr />
        <div className='d-flex justify-content-end align-items-end flex-column'>
            <div className='subtotal'>
                <h3>SUB TOTAL : $ <b>{subTotal}</b></h3>
            </div>

            <Button type='primary' onClick={()=> setBillChargeModel(true)}>CHARGE BILL</Button>
        </div >
        <Modal title='Charge Bill' visible={billChargeModel} footer={false} onCancel={()=>setBillChargeModel(false)}>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item name='customerName' label='Customer Name'>
            <Input />
          </Form.Item>
          <Form.Item name='customerPhoneNumber' label='Phone Number'>
            <Input />
          </Form.Item>
          <Form.Item name='paymentMode' label='Payment Mode'>
            <Select>
              <Select.Option value='cash'>Cash</Select.Option>
              <Select.Option value='card'>Card</Select.Option>
            </Select>
          </Form.Item>
          <div className='charge-bill-amount'>
            <h4>SubTotal : $ <b>{subTotal}</b></h4>
            <h5>Tax : $ <b>{((subTotal / 100) * 10).toFixed(2)}</b></h5>
            <hr />
            <h2>Grand Total : $ <b>{subTotal + ((subTotal / 100) * 10)}</b></h2>
          </div>
          <div className='d-flex justify-content-end'>
            <Button htmlType='submit' type='primary'>GENERATE BILL</Button>
          </div>
        </Form>
        </Modal>
    </DefaultLayout>
  )
}

export default CartPage
