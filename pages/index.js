import React, {useState} from 'react';
import axios from 'axios'


import Head from 'next/head'
// 引入跳转链接
import Link from 'next/link'

import {Button, Col, Row, List, Icon} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/comm.css'

import '../static/style/pages/index.css'

import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons';

import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from 'highlight.js'
// 引入highlight的css样式
import 'highlight.js/styles/monokai-sublime.css'


const Home = (list) => {

  const [ mylist , setMylist ] = useState(
    list.data
  )

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

    return(
    <div>
      <Head>
        <title>
          Home
        </title>
      </Head>

      <Header />

      {/* 两行布局   */}

      <Row className='comm-main' type='flex' justify='center'>
          <Col className='comm-left' xs= {24} sm={24} md={14} lg={14}>
              <List
              // header:列表头
              header={<div>最新日志</div>}
              //itemlayout 元素排列方式
              itemLayout='vertical'
              //数据源下面item就是datasource
              dataSource={mylist}
              renderItem={
                item=>(
                  <List.Item>
                    <div className='list-title'>
                      {/* 新建链接指向pathname，请求传递的参数 */}
                      <Link href={{pathname:'/detailed', query:{id:item.id}}}>
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className='list-icon'>
                      <span>
                        <CalendarOutlined type='Calendar' /> {item.addTime}
                        <FolderOutlined type ='folder' /> {item.typeName}
                        <FireOutlined type='fire' /> {item.view_count}人
                      </span>
                    </div>
                    <div className="list-context"
                          dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                    >

                    </div>
                  </List.Item>
                )
              }
              />
          </Col>

          <Col className='comm-right' xs= {0} sm={0} md={7} lg={5}>
            <Author />
            <Advert />
          </Col>




      </Row>
      <Footer />
    </div>
  )
}

// 设置组件的初始参数，并存入读取的服务器数据
Home.getInitialProps = async () => {
  const promise = new Promise ((resolve) => {
    axios.get(servicePath.getArticleList).then(
      (res)=>{
        console.log('------->',res.data)
        resolve(res.data)
      }
    ).catch(error => console.log(error.message));

  }).catch(error => console.log(error.message));

  return await promise
}

export default Home