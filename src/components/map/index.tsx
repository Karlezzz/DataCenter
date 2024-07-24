import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'
import { provinceMap, cityMap } from '../../config/mapData/geoMap'
import saleNumber from '../../config/saleNumber'

const Echart: React.FC = () => {
	const mapInstance = useRef<echarts.ECharts>()
	const [geoData, setGeoData] = useState<any>()
	const geoRef = useRef<any>(null)
	const [geoLevel, setGeoLevel] = useState<any>([])
	const geoLevelRef = useRef<any>([])

	const option = {
		title: {
			textStyle: {
				color: '#000'
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

	const geoJsonPath = () => {
		const length = geoLevelRef.current?.length || 0
		const baseDir = '/src/config/mapData/'
		const province = provinceMap[geoLevelRef.current[1]]
		const city = cityMap[geoLevelRef.current[2]]
		switch (length) {
			case 1:
				return `${baseDir}index.json`
			case 2:
				return `${baseDir}${province}/index.json`
			case 3:
				return `${baseDir}${province}/${city}.json`
			default:
				return `${baseDir}index.json`
		}
	}

	const updateGeoData = (
		childrenName: string = '中国',
		action: boolean = true
	) => {
		setGeoLevel((prevLevel: any) => {
			const newLevel = action
				? [...prevLevel, childrenName]
				: prevLevel.slice(0, -1)
			geoLevelRef.current = newLevel
			return newLevel
		})
	}

	//地图上行或下钻，更改option配置项内容
	const updateOption = () => {
		const { series = [], title } = option
		const { name = '' } = geoRef.current
		title.text = `${name}`
		series[0] = {
			...series[0],
			data: getSaleNumber(name) as never,
			mapType: name
		}
		mapInstance.current?.setOption(option)
	}

	interface SaleData {
		name: string
		value: number
	}
	const getSaleNumber = (name: string): SaleData[] => {
		const length = geoLevelRef.current.length
		if (length === 1) {
			return saleNumber.map(s => {
				return {
					name: s.name,
					value: s?.children?.reduce((acc, c) => acc + c.value, 0)
				}
			})
		}
		if (length === 2) {
			return saleNumber.find(item => item.name === name)?.children ?? []
		}
		return []
	}

	useEffect(() => {
		const path = geoJsonPath()
		if (geoLevel.length !== 0) {
			fetch(path)
				.then(res => res.json())
				.then(data => {
					setGeoData(data)
					geoRef.current = data
				})
		}
	}, [geoLevel])

	useEffect(() => {
		updateGeoData()
	}, [])

	useEffect(() => {
		document.getElementById('map')!.oncontextmenu = () => false
	}, [])

	useEffect(() => {
		if (geoData) {
			echarts.registerMap(geoRef.current?.name, geoRef.current as any)
			mapInstance.current = echarts.init(
				document.getElementById('map') as HTMLDivElement
			)
			updateOption()
		}
	}, [geoData])

	useEffect(() => {
		mapInstance.current?.on('click', (params: any) => {
			if (geoLevelRef.current.length >= 3) return
			updateGeoData(params?.name)
		})
		mapInstance.current?.on('contextmenu', (params: any) => {
			if (geoLevelRef.current.length === 1) return
			updateGeoData(params?.name, false)
		})
		mapInstance.current?.on('mouseover', () => {
			mapInstance.current?.dispatchAction({ type: 'downplay' })
		})
		return () => {
			mapInstance.current?.off('click')
			mapInstance.current?.off('contextmenu')
			mapInstance.current?.off('mouseover')
		}
	}, [geoData])

	useEffect(() => {
		window.addEventListener('resize', () => {
			mapInstance.current?.resize()
		})
		return () => {
			window.removeEventListener('resize', () => {
				mapInstance.current?.resize()
			})
		}
	}, [])

	return <div style={{ width: '100%', height: '100%' }} id="map"></div>
}
export default Echart
