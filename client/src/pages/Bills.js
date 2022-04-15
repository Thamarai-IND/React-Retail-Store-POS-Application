import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import DefaultLayout from '../components/DefaultLayout'
import { EyeOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'antd';
import {useReactToPrint} from 'react-to-print';

const Bills = () => {
  const componentRef = useRef();
  const {cartItems} = useSelector(state => state.rootReducer)
  console.log('cartItems = ',cartItems);
  const [billsData, setBillsData] = useState([])
  const [selectedBill, setSelectedBill] = useState(false)
  const [printBillModalVisibilty, setPrintBillModalVisibilty] = useState(false)
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
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'SubTotal',
      dataIndex: 'subTotal',
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (_id, record) => (
        <div className="d-flex">
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectedBill(record)
              setPrintBillModalVisibilty(true)
            }}
          />
        </div>
      ),
    },
  ]
  console.log('selected-bill = ',selectedBill);
  const cartColumns = [
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
        render : (id, record) => <div>
            <b>{record.quantity}</b>
        </div>
    },
    {
        title : "Total Cost",
        dataIndex:'_id',
        render : (id, record) => <div>
            <b>$ {record.quantity * record.price}</b>
        </div>
    },
]

  useEffect(() => {
    getAllBills()
  }, [])
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered pagination={true}/>
      {printBillModalVisibilty && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisibilty(false)
          }}
          visible={printBillModalVisibilty}
          title="Bill Details"
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h3>
                  <b>FRESH MARKET</b>
                </h3>
              </div>
              <div>
                <p>Chennai</p>
                <p>Velachery 600042</p>
                <p>9876543210</p>
              </div>
            </div>
            <div className='bill-customer-details my-2'>
                <p><b>Name</b> : {selectedBill.customerName}</p>
                <p><b>Phone Number</b> : {selectedBill.customerPhoneNumber}</p>
                <p><b>Date</b> : {selectedBill.createdAt.toString().substring(0,10)}</p>
            </div>
            <Table dataSource={cartItems} columns={cartColumns} pagination={false}/>
            <div className='dotted-border mt-2 mb-2 pb-2'>
                <h4><b>SUB TOTAL</b> : $ {selectedBill.subTotal}</h4>
                <h4><b>Tax</b> : $ {selectedBill.tax}</h4>
            </div>
            <div className='mt-2'>
                <h2><b>Total Amount</b> : $ {selectedBill.totalAmount}</h2>
            </div>
            <div className='dotted-border mt-2'>

            </div>
            <div className='text-center'>
                <p>Thanks for shopping here</p>
                <p>Visit Again :)</p>
            </div>
          </div>

          <div className='d-flex justify-content-end'>
              <Button type='primary' onClick={handlePrint}>Print this out!</Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default Bills
