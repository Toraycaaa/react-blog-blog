
import React, {useState, useEffect} from 'react';
import '../static/style/components/Header.css'
//24栅格化系统 -antd自带
import {Row, Col, Menu, Icon} from 'antd'

import {HomeOutlined, YoutubeOutlined, SmileOutlined} from '@ant-design/icons';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header=()=>{   
    const [navArray, setNavArray] = useState([])
    useEffect(()=>{
        //必须新建一个变量来保存异步方法，因为异步方法不能套异步方法
        const fetchData = async () =>{
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)

        }
        // 执行方法
        fetchData()
    //渲染页面时执行一次
    },[])
    
    // 点击方法
    const handleClick = (e) => {
        //0为首页
        if (e.key==0){
            //跳转到Home
            Router.push('/')
        }else{
            Router.push('/list?id=' + e.key)
        }
    }
    
    
    
    return (
    <div className='header'>
        {/* 流布局，justify：水平排列方式 */}
        <Row type='flex' justify='center'>
            {/* xs:小于756px的屏幕显示24格一行，sm: >=576px , md >=768px  lg:992px xl=1200px  */}
            <Col xs={24} sm={24} md={15} xl={12}>
                {/* span与div作用相同，但是是inline元素 */}
                <span className='header-logo'>Toraycaaa</span>
                <span className='header-txt'>专注前端开发</span>
            </Col>

            <Col xs={0} sm={0} md={14} xl={8}>
                <Menu mode='horizontal'onClick={handleClick}>
                    <Menu.Item key="0">
                        <HomeOutlined />
                        Home
                    </Menu.Item>
                    {
                        // map循环，对每个item都执行一遍
                        navArray.map((item)=>{
                            return (
                                <Menu.Item key={item.Id}>
                                    <SmileOutlined />
                                        {item.typeName}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Col>

        </Row>

    </div>
)
}


export default Header