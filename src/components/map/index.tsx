import * as echarts from 'echarts'
import { useEffect, useMemo, useRef, useState } from 'react'
import { provinceMap, cityMap } from '../../config/mapData/geoMap'

const Echart: React.FC = () => {
	const mapInstance = useRef<echarts.ECharts>()
	const [geoData, setGeoData] = useState<any>()
	const geoRef = useRef<any>(null)
	const [geoLevel, setGeoLevel] = useState<any>([])
	const geoLevelRef = useRef<any>([])

	const option = {
		title: {
			text: '全国地图',
			textStyle: {
				color: '#000'
			},
			left: 'center'
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
				itemStyle: {
					areaColor: '#000'
				},
				roam: true,
				zoom: 1.25,
				animation: true
			}
		]
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
		if (action) {
			setGeoLevel((l: any) => {
				return [...l, childrenName]
			})
			geoLevelRef.current = [...geoLevelRef.current, childrenName]
		} else {
			setGeoLevel((l: any) => {
				return l.slice(0, -1)
			})
			geoLevelRef.current = geoLevelRef.current.slice(0, -1)
		}
		fetch(geoJsonPath())
			.then(res => res.json())
			.then(res => {
				setGeoData(res)
				geoRef.current = res
			})
	}

	useEffect(() => {
		updateGeoData()
	}, [])

	useEffect(() => {
		document.getElementById('map')!.oncontextmenu = function () {
			return false
		}
	}, [])

	useEffect(() => {
		if (geoData) {
			echarts.registerMap('map', geoRef.current as any)
			console.log(geoRef.current)

			if (!mapInstance.current) {
				mapInstance.current = echarts.init(
					document.getElementById('map') as HTMLDivElement
				)
			}
			option.title.text = `${geoRef.current.name}地图` || '地图'
			mapInstance.current?.setOption(option)
			mapInstance.current?.on('click', (params: any) => {
				if (geoLevelRef.current.length >= 3) return
				updateGeoData(params?.name)
			})
			mapInstance.current?.on('contextmenu', (params: any) => {
				if (geoLevelRef.current.length === 1) return
				updateGeoData(params?.name, false)
			})
			return () => {
				if (mapInstance.current) {
					mapInstance.current.off('contextmenu')
					mapInstance.current.off('click')
				}
			}
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
