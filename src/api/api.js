export const fetchImages = async (page, query = '') => {
    const data = await fetch(`https://pixabay.com/api/?key=38661528-d945b4671dc1d38083bff1d33&image_type=photo&orientation=horizontal&per_page=12&page=${page}&q=${query}`)
    return data.json()
}