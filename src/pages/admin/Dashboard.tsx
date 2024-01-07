import React, { ChangeEvent, useState, } from 'react'
import { fileAsDataUrl } from '@/utils'

export default function Dashboard() {
    const [data, setData] = useState('')
    const actionFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length == 1) {
            const file = e.target.files[0]
            fileAsDataUrl(file).then(res => {
                setData(res)
            })
        }
    }
    return (
        <div>
            <input type="file" onChange={actionFileOnChange} />
            <br />
            <img src={data} alt="" />
        </div>
    )
}
