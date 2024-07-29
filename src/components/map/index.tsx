import * as echarts from 'echarts'
import React, { useEffect, useRef, useState } from 'react'
import { provinceMap, cityMap } from '../../config/mapData/geoMap'
import './index.less'

interface Props {
	options: any
	valueData?: any
	onChange?: (area: string[]) => void
}

const Map: React.FC<Props> = React.memo(({ options, valueData, onChange }) => {
	const mapInstance = useRef<echarts.ECharts>()
	const [geoData, setGeoData] = useState<any>()
	const [geoLevel, setGeoLevel] = useState<any>([])
	const geoRef = useRef<any>(null)
	const geoLevelRef = useRef<any>([])

	const initOption = () => {
		const temp = JSON.parse(JSON.stringify(options))
		if (!valueData) {
			delete temp.visualMap
			delete temp.tooltip.formatter
		}
		return temp
	}
	const option = initOption()

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
		geoLevelRef.current = action
			? [...geoLevelRef.current, childrenName]
			: geoLevelRef.current.slice(0, -1)
		setGeoLevel((prevLevel: any) => {
			const newLevel = action
				? [...prevLevel, childrenName]
				: prevLevel.slice(0, -1)
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

	const getSaleNumber = (name: string) => {
		const length = geoLevelRef.current.length
		if (length === 1) {
			return valueData?.map((s: any) => {
				return {
					name: s.name,
					value: s?.children?.reduce(
						(acc: number, c: any) => acc + c.value,
						0
					)
				}
			})
		}
		if (length === 2) {
			return (
				valueData?.find((item: any) => item.name === name)?.children ??
				[]
			)
		}
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
	}, [options])

	useEffect(() => {
		document.getElementById('map')!.oncontextmenu = () => false
	}, [])

	useEffect(() => {
		if (geoData) {
			echarts.dispose(document.getElementById('map') as HTMLDivElement)
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
			onChange?.(geoLevelRef.current)
		})
		mapInstance.current?.on('contextmenu', (params: any) => {
			if (geoLevelRef.current.length === 1) return
			updateGeoData(params?.name, false)
			onChange?.(geoLevelRef.current)
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

	return <div id="map"></div>
})
export default Map
