import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'
const Index: React.FC<any> = ({ options }) => {
	const mapInstance = useRef<echarts.ECharts>()
	const { chartName = 'chart' } = options

	useEffect(() => {
		mapInstance.current?.dispose()
		mapInstance.current = echarts.init(
			document.getElementById(chartName) as HTMLDivElement,
			'dark'
		)
		mapInstance.current?.setOption(options)
	}, [options])

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
	return (
		<>
			<div id={chartName} style={{ width: '100%', height: '100%' }}></div>
		</>
	)
}
export default Index
