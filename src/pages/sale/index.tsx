import './index.less'
import {
	FullScreenContainer,
	BorderBox13,
	BorderBox4,
	BorderBox2,
	BorderBox12,
	Decoration2,
	Decoration3
} from '@jiaminghi/data-view-react'
import Header from '../../components/header'
import MyChart from '../../components/echart'
import MyMap from '../../components/map'
import saleNumber from '../../config/saleNumber'
import { useCallback, useState, useMemo, useEffect, useRef } from 'react'

const Sale: React.FC = () => {
	//地点选择模块
	const [areaList, setAreaList] = useState<string[]>(['1'])
	const [currentArea, setCurrentArea] = useState<any[]>([])
	const mapOption = useMemo(() => {
		return {
			title: {
				textStyle: {
					color: '#fff'
				},
				left: 'center',
				text: ''
			},
			tooltip: {
				trigger: 'item',
				formatter: '{b} : {c}'
			},
			series: [
				{
					name: '全国地图',
					type: 'map',
					mapType: 'map',
					scaleLimit: {
						min: 0.5,
						max: 10
					},
					label: {
						color: '#fff',
						show: true,
						position: [1, 100],
						fontSize: 8,
						offset: [2, 0],
						align: 'left'
					},
					roam: true,
					zoom: 1,
					animation: true,
					data: []
				}
			],
			visualMap: {
				min: 0,
				max: 999999,
				realtime: false,
				calculable: true,
				inRange: {
					color: ['lightgreen', 'yellow', 'orange', 'red']
				}
			}
		}
	}, [])
	const onSelectArea = useCallback((area: string[]) => {
		setAreaList(area)
	}, [])

	const loadFileData = async () => {
		const data = await import('../../config/area/province')
		const option = {
			...saleNumberOption,
			xAxis: {
				...saleNumberOption.xAxis,
				data: data.default
			}
		}
		setSaleNumberOption(option)
	}
	useEffect(() => {
		loadFileData()
	}, [areaList])

	const [saleNumberOption, setSaleNumberOption] = useState<any>({
		chartName: 'saleNumber',
		backgroundColor: 'rgba(128, 128, 128, 0)',
		yAxis: {
			type: 'category',
			data: currentArea,
			axisLine: {
				lineStyle: {
					color: '#fff'
				}
			}
		},
		xAxis: {
			type: 'value'
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: 'bar'
			}
		]
	})

	return (
		<>
			<FullScreenContainer className={'sale'}>
				<Header />
				<main>
					<div className="top">
						<BorderBox4
							color={['lightblue', 'skyblue']}
							className="sale-number"
						>
							<div className="sale-number-area">
								<MyChart options={saleNumberOption} />
							</div>
							<Decoration2
								dur={3}
								className="sale-number-decoration"
							></Decoration2>
							<div className="sale-number-product"></div>
						</BorderBox4>
						<BorderBox2
							color={['skyblue', 'lightblue']}
							className="mapArea"
						>
							<MyMap
								options={mapOption}
								valueData={saleNumber}
								onChange={onSelectArea}
							/>
						</BorderBox2>
						<BorderBox13
							color={['skyblue', 'lightblue']}
							className="trade"
						>
							<div className="trade-detail"></div>
							<Decoration3 className="trade-decoration"></Decoration3>
							<div className="trade-total"></div>
						</BorderBox13>
					</div>

					<div className="bottom">
						<BorderBox12
							color={['skyblue', 'lightblue']}
							className="revenue-number"
						></BorderBox12>
						<BorderBox12
							color={['skyblue', 'lightblue']}
							className="order-number"
						></BorderBox12>
						<BorderBox12
							color={['skyblue', 'lightblue']}
							className="total"
						></BorderBox12>
					</div>
				</main>
			</FullScreenContainer>
		</>
	)
}

export default Sale
