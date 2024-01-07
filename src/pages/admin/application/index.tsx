import { UploadOutlined } from '@ant-design/icons'
import { Button, Divider, Upload, UploadFile } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import { useState } from 'react'

export default function Application() {
    const [filenameList, setFilenameList] = useState<string[]>([])

    const actionOnChange = (e: UploadChangeParam<UploadFile>) => {
        if (e.file.status == 'done') {
            console.log(e.file.response)
            setFilenameList([...filenameList, e.file.response.filename])
        } else if (e.file.status == 'error') {
            console.error(e.file.response)
        }
    }
    return (
        <div>
            <h3>Application</h3>
            <Divider />
            <ul>
                {
                    filenameList.map(name => {
                        return (
                            <li key={name}>
                                {name}
                            </li>
                        )
                    })
                }
            </ul>
            <Divider />
            <Upload action='http://127.0.0.1:5000/upload'
                name='file'
                headers={{ 'authorization': 'Bearer 123' }}
                onChange={actionOnChange}
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </div>
    )
}
