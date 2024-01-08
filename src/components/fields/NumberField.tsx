import { InputNumber, InputNumberProps } from 'antd'

export default function NumberField(props: InputNumberProps) {
    return (
        <InputNumber {...props} controls={false} />
    )
}
