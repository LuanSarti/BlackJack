import {
  get_deck,
  draw_single_card,
  show_cards,
  sum_hand,
  hand_cards_counter,
  finish_game,
} from "./functions.js";

let dataDeck = null;
let hand = [];

const cards_style = document.createElement("style");
cards_style.id = "cards_style";
document.querySelector("body").appendChild(cards_style);

document.querySelector("input#start").addEventListener("click", async () => {
  const back_card = document.createElement("img");
  back_card.setAttribute(
    "src",
    "http://clipart-library.com/images/8cEbeEMLi.png"
  );

  back_card.classList.add("deck");
  document.querySelector("input#start").style.display = "none";
  document.querySelector("input#draw").style.display = "block";
  document.querySelector(".pile").appendChild(back_card);

  dataDeck = await get_deck();
  hand.push((await draw_single_card(dataDeck.deck_id)).cards[0].code);
  show_cards(hand);
  hand.push((await draw_single_card(dataDeck.deck_id)).cards[0].code);
  show_cards(hand);
  document.querySelector("#score").innerHTML = `Score: ${sum_hand(hand)}`;
  document.getElementById("github").classList.remove("initial");

  hand_cards_counter(hand);
});

document.querySelector("input#draw").addEventListener("click", async () => {
  hand.push((await draw_single_card(dataDeck.deck_id)).cards[0].code);
  show_cards(hand);
  hand_cards_counter(hand);
  document.querySelector("#score").innerHTML = `Score: ${sum_hand(hand)}`;
  if (sum_hand(hand) == 21) {
    document.querySelector("#end_text").innerHTML = "You Win!";
    finish_game();
  } else if (sum_hand(hand) > 21) {
    document.querySelector("#end_text").innerHTML = "Game Over!";
    finish_game();
  }
});

document.querySelector("div.pile").addEventListener("click", async () => {
  hand.push((await draw_single_card(dataDeck.deck_id)).cards[0].code);
  show_cards(hand);
  hand_cards_counter(hand);
  document.querySelector("#score").innerHTML = `Score: ${sum_hand(hand)}`;
  if (sum_hand(hand) == 21) {
    document.querySelector("#end_text").innerHTML = "You Win!";
    finish_game();
  } else if (sum_hand(hand) > 21) {
    document.querySelector("#end_text").innerHTML = "Game Over!";
    finish_game();
  }
});

document.querySelector("input#restart").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.querySelector("i").addEventListener("click", () => {
  window.location.href = "https://github.com/LuanSarti";
});
