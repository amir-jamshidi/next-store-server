const filterProduct = (filter) => {
    switch (filter) {
        case 'new': {
            return { id: -1 };
        }
        case 'sell': {
            return { sellCount: -1 };
        }
        case 'popular': {
            return { score: -1 };
        }
        case 'expensive': {
            return { price: 1 };
        }
        case 'inexpensive': {
            return { price: -1 };
        }
        default: {
            return { id: -1 }
        }
    }
}

export default filterProduct