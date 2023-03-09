
const getItem = (key) => {
    return localStorage.getItem(key);
}

const setItem = (key, value) => {
    return localStorage.setItem(key, value);
}

const BACKGROUND_IMAGE_KEY = "BACKGROUND_IMAGE_KEY"; 

export const getBackgroundImage = () => {
    return getItem(BACKGROUND_IMAGE_KEY);
}

export const setBackgroundImage = (value) => {
    return setItem(BACKGROUND_IMAGE_KEY, value);
}