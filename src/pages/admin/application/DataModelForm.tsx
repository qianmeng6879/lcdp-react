import { Button, Form } from "antd"
import { DataModelLine } from "./DataModel"
import CharField from "@/components/fields/CharField"
import NumberField from "@/components/fields/NumberField"
import SelectField from "@/components/fields/SelectField"
import { Fragment } from "react"
import BooleanField from "@/components/fields/BooleanField"
import DateField from "@/components/fields/DateField"
import DatetimeField from "@/components/fields/DatetimeField"


const RenderField = (line: DataModelLine) => {
    switch (line.type) {
        case 'char':
            return CharField({
                maxLength: line.maxlength,
                disabled: line.readonly,
                placeholder: line.note
            })
        case 'number':
            return NumberField({
                min: line.meta?.min,
                max: line.meta?.max,
                maxLength: line.maxlength,
                disabled: line.readonly,
                placeholder: line.note
            })
        case 'select':
            return SelectField({
                options: line.options,
                disabled: line.readonly,
                placeholder: line.note
            })
        case 'boolean':
            return BooleanField({
                disabled: line.readonly
            })
        case 'date':
            return DateField({
                disabled: line.readonly,
                placeholder: line.note
            })
        case 'datetime':
            return DatetimeField({
                disabled: line.readonly,
                placeholder: line.note,
            })
        default:
            return null
    }
}


const RenderFormField = ({ line }: { line: DataModelLine }) => {
    const rules = []
    if (line.required) {
        rules.push({
            required: line.required,
            message: line.nullTips || '数据不为空！'
        })
    }
    const renderComponet = RenderField(line)
    if (!renderComponet) {
        return <></>
    }
    return (
        <Form.Item name={line.name} label={line.label} rules={rules}>
            {renderComponet}
        </Form.Item>
    )
}

export default function DataModelForm({ data, onSubmit }: { data: DataModelLine[], onSubmit: Function }) {
    const fieldCompents = data.map(item => <Fragment key={item.id}><RenderFormField line={item} /></Fragment>)
    const initData = Object.fromEntries(data.filter(item => item.default).map(item => [item.name, item.default]))

    const handleOnFinish = (result: any) => {
        if (onSubmit) {
            onSubmit(result)
        }
    }

    return (
        <Form autoComplete="off" initialValues={initData} layout="vertical" onFinish={handleOnFinish}>
            {
                fieldCompents
            }
            <Form.Item>
                <Button type={"primary"} htmlType="submit">确认</Button>
            </Form.Item>
        </Form>
    )
}
