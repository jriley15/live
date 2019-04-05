import Cookies from 'universal-cookie';

const token = "AUTH_TOKEN";
const cookies = new Cookies();

export const storeAuth = (auth) => {

    cookies.set(token, auth, { path: '/' });
    localStorage.setItem(token, auth);
}

export const getAuth = async() => {
    
    return await localStorage.getItem(token);
}

export const deleteAuth = () => {

    cookies.remove(token);
    localStorage.removeItem(token);

}



