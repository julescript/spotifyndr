export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export let env_check = process.env.NODE_ENV === 'production';

export const my_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

export const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
};

export const formatNumber = (number) => {
    var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    // what tier? (determines SI symbol)
    var tier = Math.log10(number) / 3 | 0;
    // if zero, we don't need a suffix
    if(tier === 0) return number;
    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    // scale the number
    var scaled = number / scale;
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}

export const followersString = (number) => {
    if (number > 1) {
        return formatNumber(number) + ' followers';
    }
    else if (number === 1) {
        return formatNumber(number) + ' follower';
    }
    else {
        return 'No followers'
    }
} 
