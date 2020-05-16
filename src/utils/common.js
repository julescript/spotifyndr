export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export let env_check = process.env.NODE_ENV === 'production';

export const my_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
