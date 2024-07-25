// export default [
// 	{
// 		name: '广东省',
// 		children: [
// 			{
// 				name: '广州市',
// 				value: 243643
// 			},
// 			{
// 				name: '东莞市',
// 				value: 12643
// 			},
// 			{
// 				name: '深圳市',
// 				value: 132643
// 			}
// 		]
// 	}
// ]

// 广东省地市列表
const citiesInGuangdong = [
	'广州市',
	'韶关市',
	'深圳市',
	'珠海市',
	'汕头市',
	'佛山市',
	'江门市',
	'湛江市',
	'茂名市',
	'肇庆市',
	'惠州市',
	'梅州市',
	'汕尾市',
	'河源市',
	'阳江市',
	'清远市',
	'东莞市',
	'中山市',
	'潮州市',
	'揭阳市',
	'云浮市'
]
const area = [
	{
		province: '河北省',
		cities: ['石家庄市', '唐山市', '秦皇岛市', '邯郸市']
	},
	{
		province: '山西省',
		cities: ['太原市', '大同市', '阳泉市', '长治市']
	},
	{
		province: '广东省',
		cities: [
			'广州市',
			'韶关市',
			'深圳市',
			'珠海市',
			'汕头市',
			'佛山市',
			'江门市',
			'湛江市',
			'茂名市',
			'肇庆市',
			'惠州市',
			'梅州市',
			'汕尾市',
			'河源市',
			'阳江市',
			'清远市',
			'东莞市',
			'中山市',
			'潮州市',
			'揭阳市',
			'云浮市'
		]
	},
	{
		province: '湖南省',
		cities: [
			'长沙市',
			'株洲市',
			'湘潭市',
			'衡阳市',
			'邵阳市',
			'岳阳市',
			'常德市',
			'张家界市',
			'益阳市',
			'郴州市',
			'永州市',
			'怀化市',
			'娄底市'
		]
	}
]

function generateGuangdongFakeData() {
	return area.map(province => {
		return {
			name: province.province,
			children: province.cities.map(city => {
				return {
					name: city,
					value: Math.floor(Math.random() * 999999)
				}
			})
		}
	})
}

const guangdongFakeData = generateGuangdongFakeData()

export default guangdongFakeData
