import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import './index.less'
import { DatePicker } from 'antd'
import { Decoration7 } from '@jiaminghi/data-view-react'

const pageName = ['销售数据', '仓储信息']
const Index: React.FC = React.memo(() => {
	const naviagete = useNavigate()
	const location = useLocation()
	const [title, setTitle] = useState<string>('123')

	useEffect(() => {
		const { pathname = '' } = location
		if (pathname === '/sale') setTitle(pageName[0])
		if (pathname === '/store') setTitle(pageName[1])
	}, [location.pathname])

	const displayNextPage = useMemo(() => {
		const { pathname = '' } = location
		if (pathname === '/sale') return pageName[1]
		if (pathname === '/store') return pageName[0]
	}, [location.pathname])

	const jumpOtherPage = useCallback(() => {
		const { pathname = '' } = location
		if (pathname === '/sale') naviagete('/store')
		if (pathname === '/store') naviagete('/sale')
	}, [location.pathname])

	return (
		<div className="header">
			<div className="title">{title}</div>
			<div className="toolbar">
				<Decoration7 className="next-page" onClick={jumpOtherPage}>
					{displayNextPage}→
				</Decoration7>
				<div className="date">
					<span>选择日期:</span>
					<DatePicker />
				</div>
			</div>
		</div>
	)
})
export default Index
