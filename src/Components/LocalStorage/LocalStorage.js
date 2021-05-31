function setToLS(favArr) {
    localStorage.setItem('SavedCities', JSON.stringify(favArr));
}

export {setToLS}