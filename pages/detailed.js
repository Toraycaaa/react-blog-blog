import React from 'react';

import Head from 'next/Head'

import {Button, Col, Row, Breadcrumb, Affix} from 'antd'
import Header from '../components/Header'
import '../static/style/pages/comm.css'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Advert from '../components/Advert'
import '../static/style/pages/detailed.css'


// 引入markdown-navbar
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
// 引入highlight的css样式
import 'highlight.js/styles/monokai-sublime.css'
// 引入文章目录生成器
import Tocify from '../components/tocify.tsx'

import servicePath from '../config/apiUrl'



import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons';

const Detailed = (props) => {

  // marked渲染
  const renderer = new marked.Renderer()
  
  const tocify = new Tocify()
    //生成锚

  renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

  

 

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

  // 将文章内容转化为markdown
  let html = marked(props.article_content)

  return(
  <div>
    <Head>
      <title>
        Detailed
      </title>
    </Head>

    <Header />

    {/* 两行布局   */}

    <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs= {24} sm={24} md={15} lg={12}>
          <div>
            <div className='bread-div'>
              <Breadcrumb>
              <Breadcrumb.Item>
                <a href='/'>Home</a>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <a href='/'>Video</a>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <a href='/'>XXX</a>
              </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          <div className='detailed-title'>
            React-tutorial
          </div>

          <div className='list-icon center'>
            <span>
              <CalendarOutlined />2019-06-28
            </span>
            <span>
              <FolderOutlined />Video
            </span>
            <span>
              <FireOutlined />100人
            </span>
          </div>
            <div className='detailed-content'
            // 渲染html
              dangerouslySetInnerHTML={{__html:html}}
              >
              
            </div>
        </Col>

        <Col className='comm-right' xs= {0} sm={0} md={7} lg={5}>
        <Author />
        <Advert />
        {/* 图钉效果，距离顶端的距离5px */}
        <Affix offsetTop={5}>
          <div className='detailed-nav comm-box'>
            <div className='nav-title'>Content</div>
            <div className="toc-list">
                {tocify && tocify.render()}
            </div>
          </div>
        </Affix>

        </Col>


    </Row>
  <Footer />
  </div>
)
}

// 设置组件的初始参数，并存入读取的服务器数据 context:前台传来的id
Detailed.getInitialProps = async (context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise ((resolve) => {
    axios.get(servicePath.getArticleById + id).then(
      (res)=>{
        console.log('------->',res.data)
        resolve(res.data.data[0])
      }
    )

  })

  return await promise
}

export default Detailed