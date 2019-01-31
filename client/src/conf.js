

const conf = {
    API : {
        END_POINT : 'https://cdn.contentful.com',
        SPACE_ID : process.env.REACT_APP_CTF_SPACE_ID,
        TOKEN : process.env.REACT_APP_CTF_TOKEN
    },
    minScrollBacktotop : 1000,
    headerHeightFixed: 62,
    skills : [
        {
            name: "REACT",
            value: "70%"
        },
        {
            name: "ES6",
            value: "70%"
        },
        {
            name: "REDUX",
            value: "60%"
        },
        {
            name: "HTML",
            value: "90%"
        },
        {
            name: "CSS",
            value: "80%"
        },
        {
            name: "NODEJS",
            value: "30%"
        }
    ],
    aboutDescription : "Spécialisé depuis plus de __10 ans__ dans la conception d'interface web, je travail désormais essentiellement en __ES6__ et avec des librairies Javascript",
    aboutDescription2: "__Mes développements s'organisent autour de quatre axes__",
}

export default conf;