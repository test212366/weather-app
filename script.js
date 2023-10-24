const apikey = '3265874a2c77ae4a04bb96236a642d2f'
const main = document.getElementById('main'),
	form = document.getElementById('form'),
	search = document.getElementById('input')


const url = (location) =>
	`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`


async function getWeatherByLocation(location) {
	const resp = await fetch(url(location), {
		origin: 'cors'
	})
	const respData = await resp.json()
	addWeatherToPage(respData)
}
function addWeatherToPage(data) {
	main.innerHTML = ''
	const temp = KtoC(data.main.temp)
	const weather = document.createElement('div')
	weather.classList.add('weather')
	weather.innerHTML = `
		<small>There are</small>
		<h2>${temp}C</h2>
		<p>${data.name}</p>
	`
	main.appendChild(weather)

}

function KtoC(K) {
	return Math.floor(K - 273.15)
}
form.addEventListener('submit', e => {
	e.preventDefault()
	const location = search.value
	if (location) {
		getWeatherByLocation(location)
	}
	search.value = ''
})