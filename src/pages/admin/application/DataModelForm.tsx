import { Form } from "antd"
import { DataModelLine } from "./DataModel"
import CharField from "@/components/fields/CharField"
import NumberField from "@/components/fields/NumberField"
import SelectField from "@/components/fields/SelectField"
import { Fragment } from "react"


const RenderField = ({ line }: { line: DataModelLine }) => {
    switch (line.type) {
        case 'char':
            return <CharField defaultValue={line.default} />
        case 'number':
            return <NumberField />
        case 'select':
            return <SelectField options={line.options} defaultValue={line.default} />
    }
    return <></>
}

const RenderFormField = ({ line }: { line: DataModelLine }) => {
    return (
        <Form.Item label={line.label}>
            <RenderField line={line} />
        </Form.Item>
    )
}

export default function DataModelForm({ data }: { data: DataModelLine[] }) {
    return (
        <Form layout="vertical">
            {
                data.map(item => <Fragment key={item.id}><RenderFormField line={item} /></Fragment>)
            }
        </Form>
    )
}
