import React, {useState, useEffect} from 'react';

import Head from 'next/head'

import {Button, Col, Row, List, Icon, Breadcrumb} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/comm.css'
import '../static/style/pages/index.css'

import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

import marked from 'marked'
import hljs from 'highlight.js'
// 引入highlight的css样式
import 'highlight.js/styles/monokai-sublime.css'

import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons';


const MyList = (list) => {

  const [ mylist , setMylist ] = useState(
    list.data
  )
  // 当数据发生变化会刷新
  useEffect(()=>{
    setMylist(list.data)
  })

  const renderer = new marked.Renderer()
  
  // marked配置
  marked.setOptions({
    // 渲染方式
    renderer:renderer,
    //和github渲染方式相同
    gfm:true,
    //markdown是否容错
    pedantic: false,
    // 原始输出是否忽略html标签
    sanitize:false,
    // 是否输出表格为github样式
    tables: true,
    //是否支持github格式的换行符
    breaks:false,
    // 是否渲染列表
    smartLists:true,
    smartypants: false,
    // 如何代码高亮
    highlight:function (code){
      // 自动检测代码类型并高亮
      return hljs.highlightAuto(code).value
    }
  })
  
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                  <Breadcrumb.Item>Video</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <List
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">
                      <Link href={{pathname:'', query:{id:item.id }}}>
                          <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span><Icon type="calendar" /> {item.addTime}</span>
                      <span><Icon type="folder" /> {item.typeName}</span>
                      <span><Icon type="fire" /> {item.view_count}人</span>
                    </div>
                    <div className="list-context"  
                      dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                    </div>  
                  </List.Item>
                )}
              />  

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer/>

   </>
  )

} 

MyList.getInitialProps = async (context)=>{
  let id = context.query.id
  const promise = new Promise ((resolve) => {
    axios.get(servicePath.getListById + id).then(
      (res)=>{
        console.log(res.data)
        resolve(res.data)
      }
    ).catch(error => console.log(error.message));

  }).catch(error => console.log(error.message));

  return await promise
}

export default MyList