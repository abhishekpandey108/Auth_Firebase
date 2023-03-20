import React,{useState, useEffect} from 'react'
import { useNavigate,Outlet,useParams,useLocation } from 'react-router-dom';
import { menuItems } from '../constants/sideMenu';
import { Layout, Menu } from 'antd';
import { logout } from '../feature/userSlice';
import { useDispatch } from 'react-redux';
const { Header, Sider, Content, Footer } = Layout;
export default function BaseLayout(){
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const {'*' : route} = useParams(); 
    const getCurrentSelectedKey = (currParam) => {
        let key = ['1'];
        if (currParam === '') key = ['1'];
        if (currParam.includes('saved')) key = ['2'];
        if (currParam.includes('sent')) key = ['3'];
        if (currParam.includes('signed')) key = ['4'];
        return key;
      };

    const location = useLocation();
    // useEffect(()=>{
    //     setSelectedKey(()=>{
    //         return getCurrentSelectedKey(route);
    //     })
    // },[location.pathname])

    const[selectedKey,setSelectedKey] = useState(()=>{
        if(route==='home') return ['1'];
        if(route.includes=='table2') return ['2'];
        if(route.includes=='table3') return ['3'];
        if(route.includes=='table4') return ['4'];
        return ['1']
    })

const handleMenuClick = ({item,key}) => {
    setSelectedKey([key]);
    key === '1' && navigate('/home');
    key === '2' && navigate('/table2');
    key === '3' && navigate('/table3');
    key === '4' && navigate('/table4');
}

  return (
    <Layout hasSider>
        <Sider style={{position:'fixed',top:0,bottom:0,left:0,zIndex:'20',height:'100vh'}}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
               items={menuItems} onClick={handleMenuClick}
            />
        </Sider>
        <Layout>
            <Header style={{
                backgroundColor:'white',
                textAlign:'center',
                position:'sticky',
                right:0,
                left:0,
                top:0,
                zIndex:'10',
                borderBottom:'1px solid silver',
                height:'60px'
            }}>
               
                <button onClick={()=>{
                    console.log("on logout page")
                    dispatch(logout())
                }}
                style={{marginLeft:'50rem'}}>Log out</button>
            </Header>
            <Content style={{marginLeft:'13rem',marginBottom:'2rem'}}>
                <Outlet />
            </Content>
            <Footer style={{
                backgroundColor:'white',
                textAlign:'center',
                position:'fixed',
                bottom:0,
                left:0,
                right:0,
                height:'40px'
            }}>
                <p style={{marginTop:'-1rem'}}>Footer</p>
            </Footer>
        </Layout>
    </Layout>

  )
}

