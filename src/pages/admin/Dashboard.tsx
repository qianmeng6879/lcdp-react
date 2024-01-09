import { useEffect, useRef } from "react";
import { Button, Col, Row, Statistic } from "antd";
import * as echarts from 'echarts'

type EchartsModel = {
    date: string
    number: number
}

const initData1: EchartsModel[] = [
    {
        date: "2024-01-01",
        number: 729
    },
    {
        date: "2024-01-02",
        number: 987
    },
    {
        date: "2024-01-03",
        number: 920
    },
    {
        date: "2024-01-04",
        number: 1023
    },
    {
        date: "2024-01-05",
        number: 892
    },
    {
        date: "2024-01-06",
        number: 1220
    },
    {
        date: "2024-01-07",
        number: 1083
    }
]


export default function Dashboard() {
    const graph_1 = useRef()
    const graph_2 = useRef()

    useEffect(() => {
        renderGraph1(initData1)
        renderGraph2(initData1)
    }, []);

    const renderGraph1 = (data) => {
        const myChart = echarts.init(graph_1.current);
        const option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            dataset: {
                dimensions: ['date', 'number'],
                source: data
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
                {
                    type: 'bar',
                    name: "用户数量",
                    smooth: true,
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' }
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option);
    }


    const renderGraph2 = (data) => {
        const myChart = echarts.init(graph_2.current);
        const option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            dataset: {
                dimensions: ['date', 'number'],
                source: data
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
                {
                    type: 'bar',
                    name: "用户数量",
                    smooth: true,
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' }
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option);
    }

    return (
        <div>
            <Row>
                <Col span={4} offset={1} className={'bg-white p-10'}>
                    <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={4} offset={2} className={'bg-white p-10'}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                </Col>
                <Col span={4} offset={2} className={'bg-white p-10'}>
                    <Statistic title="Active Users" value={112893} loading />
                </Col>
                <Col span={4} offset={2} className={'bg-white p-10'}>
                    <Statistic title="Active Users" value={112893} />
                </Col>
            </Row>

            <Row style={{ 'marginTop': "30px" }}>
                <Col span={10} offset={1}>
                    <div style={{ backgroundColor: 'white', width: "100%", height: '400px' }} ref={graph_1}>
                    </div>
                </Col>
                <Col span={10} offset={2}>
                    <div style={{ backgroundColor: 'white', width: "100%", height: '400px' }} ref={graph_2}>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
