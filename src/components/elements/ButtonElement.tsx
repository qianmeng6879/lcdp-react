import { Button, notification } from 'antd'
import React from 'react'

export default function ButtonElement() {
    const actionClick = () => {
        notification.info({ message: "按钮点击" })
    }
    return (
        <Button onClick={actionClick}>按钮</Button>
    )
}
