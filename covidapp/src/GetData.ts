export type CovidStats = {
    get: string,
    parameters:string[],
    errors: string[],
    result : number,
    response:covidDetail[]
}
export type covidDetail = {
    continent: string,
    country: string,
    population: number,
    day: string,
    time: string,
    cases:{
        new:number|null,
        active:number
        critical:number|null
        recovered: number
        "1M_pop":string
        total:number
    },
    deaths:{
        "new":number| null
        "1M_pop":number|null
        "total":number|null
    },
    tests:{
        "1M_pop":number|null
        "total":number|null
    }
}

export async function getCovidData(country?:string): Promise<CovidStats> {
    let urlStr:string;
    if(country) {
        const searchStr = encodeURI(country);
        urlStr = `https://covid-193.p.rapidapi.com/statistics?country=${searchStr}`
    } else {
        urlStr = "https://covid-193.p.rapidapi.com/statistics";
    }
    const response:Response = await fetch(urlStr, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "46184cc6cfmsh8158e5a64c009fap162410jsna2ba68136244",
            "x-rapidapi-host": "covid-193.p.rapidapi.com"
        }
    });
    return response.json();
}

export type Countries = {
    get: string,
    parameters:string[],
    errors: string[],
    result : number,
    response:string[]
}
export async function getCountries(): Promise<Countries> {
    const response =  await fetch("https://covid-193.p.rapidapi.com/countries", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "46184cc6cfmsh8158e5a64c009fap162410jsna2ba68136244",
            "x-rapidapi-host": "covid-193.p.rapidapi.com"
        }
    });
    return response.json();
}