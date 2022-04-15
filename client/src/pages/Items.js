import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import DefaultLayout from '../components/DefaultLayout'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'

const Items = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null)
  const [addEditModalVisibilty, setAaddEditModalVisibilty] = useState([]);
  const dispatch = useDispatch()
  const getAllItems = async () => {
    dispatch({ type: 'showLoading' })
    const res = await axios
      .get('/api/items')
      .then((response) => {
        dispatch({ type: 'hideLoading' })
        setItems(response.data)
      })
      .catch((err) => {
        dispatch({ type: 'hideLoading' })
        console.log(err)
      })
  }

  const deleteItem = (record) => {
    dispatch({ type: 'showLoading' })
    const res =  axios
      .post('/api/items/delete-item',{itemId : record._id})
      .then((response) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item deleted successfully')
        setItems(response.data)
        getAllItems()
      })
      .catch((err) => {
        dispatch({ type: 'hideLoading' })
        message.error('Something went wrong')
        console.log(err)
      })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title : 'Category',
      dataIndex : 'category',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (_id, record) => (
        <div className="d-flex">
          <EditOutlined className='mx-2'onClick={() => {
            setEditingItem(record)
            setAaddEditModalVisibilty(true)
          }}/>
          <DeleteOutlined className='mx-2' onClick={()=>deleteItem(record)}/>
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllItems()
  }, []);

  const onFinish = (values) => {
    dispatch({ type: 'showLoading' })
    if(editingItem == null) { // if block is add functionality
      axios.post('/api/items/add-item', values)
      .then((response) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item added successfully')
        setAaddEditModalVisibilty(false);
        getAllItems()
      })
      .catch((err) => {
        dispatch({ type: 'hideLoading' })
        message.error('Something went wrong')
        console.log(err)
      })
    } else { // else block for edit functionality
      axios.post('/api/items/edit-item', {...values, itemId : editingItem._id})
      .then((response) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item eidted successfully')
        setEditingItem(null)
        setAaddEditModalVisibilty(false);
        getAllItems()
      })
      .catch((err) => {
        dispatch({ type: 'hideLoading' })
        message.error('Something went wrong')
        console.log(err)
      })
    }
  }

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <Button type='primary' onClick={() => setAaddEditModalVisibilty(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={items} bordered pagination={false}/>
      {addEditModalVisibilty && (
        <Modal onCancel={() => {
          setEditingItem(null)
          setAaddEditModalVisibilty(false)
        }} visible={addEditModalVisibilty} title={`${editingItem !==null ? "Edit Item" : "Add New Item"}`} footer={false}>
        <Form initialValues={editingItem} layout='vertical' onFinish={onFinish}>
          <Form.Item name='name' label='Name'>
            <Input />
          </Form.Item>
          <Form.Item name='price' label='Price'>
            <Input />
          </Form.Item>
          <Form.Item name='image' label='Image URL'>
            <Input />
          </Form.Item>
          <Form.Item name='category' label='Category'>
            <Select>
              <Select.Option value='fruits'>Fruits</Select.Option>
              <Select.Option value='vegetable'>Vegetables</Select.Option>
              <Select.Option value='meat'>Meat</Select.Option>
            </Select>
          </Form.Item>

          <div className='d-flex justify-content-end'>
            <Button htmlType='submit' type='primary'>Save</Button>
          </div>
        </Form>
      </Modal>
      )}
    </DefaultLayout>
  )
}

export default Items
