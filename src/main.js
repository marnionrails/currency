import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './currency-service.js';

$('form#money-exchange').submit(function(event) {
  event.preventDefault();
  $('.results').empty();
  let promise = Currency.getCurrency();
  promise.then(function(response) {
    if (response instanceof Error) {
      console.log("ERROR");
    }
    const body = JSON.parse(response);
    let input = $("#original").val();
    let choice = $("#currency").val();
    if (choice === "Euro") {
      $('.results').append(`<p>${input * body["conversion_rates"]["EUR"]} euros<p>`);
    } 
    else if (choice === "Pounds") {
      $('.results').append(`<p>${input * body["conversion_rates"]["GBP"]} pounds<p>`);
    }
    else if (choice === "Francs") {
      $('.results').append(`<p>${input * body["conversion_rates"]["CHF"]} francs<p>`);
    }
    else if (choice === "Yen") {
      $('.results').append(`<p>${input * body["conversion_rates"]["JPY"]} yen<p>`);
    }
    else if (choice === "Pesos") {
      $('.results').append(`<p>${input * body["conversion_rates"]["MXN"]} pesos<p>`);
    }
    else if (isNaN(body["conversion_rates"][choice])) {
      $('.results').append(`<p>Invalid Currency<p>`);
    }
    else {
      $('.results').append('<p>Something went wrong</p>');
    }
  }, function(error) {
    $('.results').append(`There was an error processing your request: ${error}`);
  });
});

