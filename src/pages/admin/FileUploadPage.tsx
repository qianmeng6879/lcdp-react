import { notification } from 'antd/lib'
import * as qiniu from 'qiniu-js'
import { v4 as uuid } from 'uuid'
export default function FileUploadPage() {

    function genarFilename(type: string) {
        return uuid().replaceAll("-", '') + "." + type.substring(type.lastIndexOf("/") + 1)
    }

    const fileOnChange = (e: any) => {
        if (e.target.files.length === 0) {
            return
        }
        const file = e.target.files[0]
        const token = "=="
        const key = "erp/" + genarFilename(file.type)

        const observable = qiniu.upload(file, key, token, {}, {})
        observable.subscribe({
            complete: function (result) {
                console.log(result)
                notification.success({ message: "文件上传成功" })
            },
            error: function (err) {
                console.log(err)
                notification.error({ message: "上传失败" })
            }
        })
    }

    return (
        <div className="bg-white p-10">
            <input type="file" onChange={fileOnChange} />
        </div>
    )
}
