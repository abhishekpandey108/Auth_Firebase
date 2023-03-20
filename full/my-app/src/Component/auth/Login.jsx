import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../feature/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function Login(){

  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(()=>{
    if(user.user){
        navigate('/home')
    }
  },[user.user])

  const onFinish = async(values) => {
    dispatch(login(values));
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return(
    <div style={{marginLeft:'auto'}}>
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  <Link to='/signup'>Go to sign up page</Link>

  </div>
)};
