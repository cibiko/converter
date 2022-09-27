const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
getCurrencies();
setInterval(getCurrencies, 10000);

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


// Функция получения курса валют и отображения их на странице
async function getCurrencies () {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await response.json();
    const result = await data;
   
    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    console.log(rates);

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    //Цвет для информера USD
    if (rates.USD.Value > rates.USD.Previous){
       elementUSD.classList.add('bottom');
    }else {
        elementUSD.classList.add('top');
    }

     //Цвет для информера EUR
    if (rates.EUR.Value > rates.EUR.Previous){
        elementEUR.classList.add('bottom');
     }else {
         elementEUR.classList.add('top');
     }

      //Цвет для информера GBP
     if (rates.GBP.Value > rates.GBP.Previous){
        elementGBP.classList.add('bottom');
     }else {
         elementGBP.classList.add('top');
     }

}

input.oninput = convertValue;
select.oninput = convertValue;

//Функция конвертации:>
function convertValue (){
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}
