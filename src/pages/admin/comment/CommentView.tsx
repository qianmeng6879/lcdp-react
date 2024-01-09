import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, List, Space, message } from 'antd';
import { formatDatetime } from '@/utils/date';
import { v4 as uuid } from 'uuid'
const data = Array.from({ length: 23 }).map((_, i) => ({
    id: uuid(),
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description: formatDatetime(new Date).substring(0, 16),
    ipAddr: '四川',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export default function CommentView() {
    const actionCollect = (dataId: string) => {
        message.success("收藏 " + dataId)
    }
    const actionLike = (dataId: string) => {
        message.success("点赞 " + dataId)
    }

    const actionComment = (dataId: string) => {
        message.success("评论 " + dataId)
    }

    return (
        <div>
            <List
                itemLayout="vertical"
                pagination={{
                    align: "start",
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 4,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item className='bg-white' style={{ marginBottom: "5px" }}
                        key={item.title}
                        actions={[
                            <a onClick={() => actionCollect(item.id)} href='#' style={{ color: "rgba(0, 0, 0, 0.45" }}><IconText icon={StarOutlined} text="156" key="list-vertical-star-o" /></a>,
                            <a onClick={() => actionLike(item.id)} style={{ color: "rgba(0, 0, 0, 0.45" }}><IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" /></a>,
                            <a onClick={() => actionComment(item.id)} style={{ color: "rgba(0, 0, 0, 0.45" }}><IconText icon={MessageOutlined} text="2" key="list-vertical-message" /></a>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description + " " + item.ipAddr}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    );

}