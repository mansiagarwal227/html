import {getCountries} from "./GetData";
import {FillCovidData} from "./FillCovidData";

export function FillCountries ():void {
    const filter = document.getElementById("country-filter") as HTMLSelectElement;
    filter.innerHTML = "<option selected value=''></option>";
    const result = getCountries();
    result.then(data => {
        data.response.forEach(country => {
            const option = document.createElement("option") as HTMLOptionElement;
            option.value = option.text = country;
            filter.append(option);
        });
    });

    filter.onchange = (e)=>{
        FillCovidData((e.target as HTMLSelectElement).value);
    }
}
