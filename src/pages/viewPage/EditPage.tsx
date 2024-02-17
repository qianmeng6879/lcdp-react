import { Col, Input, InputNumber, Row } from 'antd'
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'
import './EditPage.less'
import ButtonElement from '@/components/elements/ButtonElement'
import InputElement from '@/components/elements/InputElement'
const navStyle: CSSProperties = {
    backgroundColor: "greenyellow"
}

const mainStyle: CSSProperties = {
    backgroundColor: "white",
    padding: "0 20px"
}

const funcStyle: CSSProperties = {
    backgroundColor: "#ccc"
}


const compoentButtonStyle: CSSProperties = {
    width: "60px",
    height: "60px",
    lineHeight: "60px",
    textAlign: "center",
    border: "1px #000 solid",
    cursor: 'pointer'
}

function CompoentReader(value: string): ReactElement {

    const changeFunc = (prop: any) => {
        
    }


    switch (value) {
        case "button":
            const prop = [
                {
                    name: "宽度",
                    target: "width",
                    value: "60"
                },
                {
                    name: "文字",
                    target: "value",
                    value: "按钮"
                },
                {
                    name: "颜色",
                    target: "backgroundColor",
                    value: "whitee"
                }
            ]
            return (
                <div onClick={e => { changeFunc(prop) }}>
                    <ButtonElement />
                </div>
            )
        case "input":
            return <InputElement />
    }
    return (
        <>
        </>
    )
}


export default function EditPage() {
    useEffect(() => {
        window.onbeforeunload = function () {
            return true
        }

        window.onunload = function () { }

        return () => {
            window.onbeforeunload = null
            window.onunload = null
        }
    }, [])


    const [width, setwidth] = useState(1080)
    const aciotnChangeWidth = (value: any) => {
        setwidth(value != null ? value : 1080)
    }


    const [compoents, setCompoents] = useState<Array<ReactElement>>([])
    const actionAddCompoent = (e: string) => {
        const compoent = CompoentReader(e)
        setCompoents([...compoents, compoent])
    }
    return (
        <div className='bg-white p-10' style={{ height: "100%" }}>
            <Row style={{ height: "100%" }}>
                <Col span={3} style={navStyle}>
                    <div className='flex'>
                        <div style={compoentButtonStyle} onClick={() => { actionAddCompoent("button") }}>
                            按钮
                        </div>
                        <div style={compoentButtonStyle} onClick={() => { actionAddCompoent("input") }}>
                            输入框
                        </div>
                    </div>
                </Col>
                <Col span={16} style={mainStyle}>
                    <div className='page_header'>
                        宽度：<InputNumber value={width} onChange={(e) => aciotnChangeWidth(e)} min={360} max={1500} /> px
                    </div>
                    <div className='page_edit_area' style={{ width: width + "px" }}>
                        {
                            compoents.map(item => {
                                return item
                            })
                        }
                    </div>
                </Col>
                <Col span={5} style={funcStyle}>
                    3
                </Col>
            </Row>
        </div>
    )
}
