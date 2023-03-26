// type must be one of [MC, VISA, AE]

const cardType = (type) => {
    if(type === 'mastercard'){
        return 'MC';
    } else if(type === 'visa') {
        return 'VISA';
    } else if(type === 'amex') {
        return 'AE';
    } else return 'MC';
};

export default cardType;