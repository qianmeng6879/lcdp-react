import { formatDatetime } from '@/utils/date'
import { DatePicker } from 'antd'

export default function DatetimeField(props: any) {
    // return (
    //     <input type={'date'} />
    // )8 15:14:38
    return (
        <DatePicker onChange={(e: any) => { console.log(formatDatetime(new Date(e))) }} {...props} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
    )
}
