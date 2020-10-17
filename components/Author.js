import {Avatar, Divider} from 'antd'
import '../static/style/components/Author.css'
import {GithubOutlined, QqOutlined, WechatOutlined} from '@ant-design/icons';

const Author = () => {
    return (
        <div className='author-div comm-box'>
            <div>
                <Avatar sze={100} src='https://blogimages.jspang.com/blogtouxiang1.jpg' />
                <div className='author-introduction'>
                    专注于WEB和移动前端开发
                </div>
                <Divider>社交账号</Divider>
                <GithubOutlined className='account' />
                <QqOutlined className='account' />
                <WechatOutlined className='account' />
                
            </div>
        </div>
    )
}

export default Author