type stringKey = Record<string, string>
const provinceMap: stringKey = {
	广东省: 'guangdong',
	广西省: 'guangxi'
}
export const getProvinceGeoData = (provinceName: string) => {
	fetch('src/config/mapData/' + provinceMap[provinceName] + '.json')
		.then(res => res.json())
		.then(res => {
			return res
		})
}
