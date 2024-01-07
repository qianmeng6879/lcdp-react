import { Button, Flex, Form, Input, InputNumber, message } from "antd";
import { useState } from "react";
import { router } from "@/router";


type LoginParam = {
    username: string,
    password: string,
    code: number
}

export default function Login() {
    const loginAction = (data: LoginParam) => {
        setLoading(true)
        console.log(data)
        if (data.username === 'admin' && data.password === 'admin') {
            message.success("登录成功")
            router.navigate('/admin')
        } else {
            message.error("账号密码错误")
        }
        setLoading(false)
    }

    const [isLoading, setLoading] = useState(false)

    return (
        <Flex className="login" style={{ height: '100vh' }} justify={'center'} align={'center'}>
            <Form layout={'vertical'} style={{
                width: "320px",
                height: '280px'
            }} initialValues={{ username: '19102871575', password: 'hello' }} onFinish={loginAction} autoComplete="off">
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
                    <Input maxLength={12} />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
                    <Input.Password maxLength={16} />
                </Form.Item>
                <Form.Item label="验证码" name="code" rules={[{ required: true, message: "请输入验证码" }]}>
                    <InputNumber controls={false} maxLength={4} addonAfter={<Button>获取验证码</Button>} />
                </Form.Item>
                <Form.Item>
                    <Button loading={isLoading} className="w-100" type="primary" htmlType="submit">登录</Button>
                </Form.Item>
            </Form>
        </Flex >
    )
}
