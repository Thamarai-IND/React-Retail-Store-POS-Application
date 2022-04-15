import React, { useEffect } from 'react';
import '../resources/authentication.css'
import { Button, Col, Form, Input, message, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onFinish = (values) => {
    //console.log(values)
    dispatch({type:'showLoading'})
    axios.post("/api/users/login",values).then((res)=>{
      dispatch({type:'hideLoading'})
      console.log("front end = ", res);
      if(res.status===200){
        message.success("Login Successfully!")
        localStorage.setItem('pos-user',JSON.stringify(res));
        navigate('/home')
      }
    }).catch((err)=> {
      dispatch({type:'hideLoading'})
      message.error('Login Failed')
    })
  }

  useEffect(()=> {
    if(localStorage.getItem('pos-user'))
    navigate('/home')
  },[])
  return (
    <div className="authentication">
      <Row >
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
              <h3 className='shop-title'><b>Retail Market POS Application</b></h3>
              <hr/>
              <h4>Login Here!</h4>
            <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'No. cant be empty!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'No. cant be empty!' }]}>
              <Input type='password'/>
            </Form.Item>
            <div className="d-flex justify-content-end justify-content-between align-items-center">
                <Link to='/register'>Not Registered Yet ? Click Here To Rgister</Link>
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
