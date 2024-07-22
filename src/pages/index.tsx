import { Link } from 'react-router-dom'
import './index.less'
import {
	FullScreenContainer,
	BorderBox11,
	Decoration11
} from '@jiaminghi/data-view-react'
const Index = () => {
	return (
		<FullScreenContainer className={'container'}>
			<BorderBox11 title={'Data Center'}>
				<div className="tab">
					<Decoration11 className={'tab-item'}>
						<Link to="/sale">SALE</Link>
					</Decoration11>
					<Decoration11 className={'tab-item'}>
						<Link to="/store">STORE</Link>
					</Decoration11>
				</div>
			</BorderBox11>
		</FullScreenContainer>
	)
}
export default Index
