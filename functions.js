export const get_deck = async () => {
  const response = await (
    await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  ).json();
  return response;
};

export const draw_single_card = async (id) => {
  const response = await (
    await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
  ).json();
  return response;
};

export const show_cards = (array) => {
  array.forEach((e, i) => {
    if (!document.getElementById(e)) {
      const div_father = document.createElement("div");
      const div_card = document.createElement("div");
      const img_card = document.createElement("img");

      div_father.classList.add("initial");
      div_father.classList.add("card_parent");
      div_card.classList.add("card");
      div_card.id = e;

      img_card.src = `https://deckofcardsapi.com/static/img/${e}.png`;

      document.querySelector("#hand").appendChild(div_father);
      div_father.appendChild(div_card);
      setTimeout(() => {
        div_father.classList.remove("initial");
      }, 100);
      document.getElementById(e).appendChild(img_card);
      if (e[1] == "C" || e[1] == "S") {
        div_card.classList.add("black");
      } else {
        div_card.classList.add("red");
      }
    }
  });
};

export const sum_hand = (array) => {
  let sum = 0;
  array.forEach((e) => {
    let value = 0;
    if (e[0] == "A") {
      value = 1;
    } else if (
      e[0] == "2" ||
      e[0] == "3" ||
      e[0] == "4" ||
      e[0] == "5" ||
      e[0] == "6" ||
      e[0] == "7" ||
      e[0] == "8" ||
      e[0] == "9"
    ) {
      value = eval(e[0]);
    } else {
      value = 10;
    }
    sum += value;
  });
  return sum;
};

export const hand_cards_counter = (array) => {
  const cards_style = document.getElementById("cards_style");
  cards_style.innerHTML = "";

  array.forEach((e, i) => {
    if (array.length % 2 == 0) {
      if (i + 1 < array.length / 2) {
        cards_style.innerHTML += `#hand .card_parent:nth-child(${
          i + 1
        }) {left: ${47 - (array.length / 2 - (i + 1)) * 5}%;}`;
      } else if (i + 1 == array.length / 2) {
        cards_style.innerHTML += `#hand .card_parent:nth-child(${
          i + 1
        }) {left: ${47}%;}`;
      } else {
        cards_style.innerHTML += `#hand .card_parent:nth-child(${
          i + 1
        }) {left: ${47 + (i + 1 - array.length / 2) * 5}%;}`;
      }
    } else {
      if (i + 1 < Math.round(array.length / 2)) {
        cards_style.innerHTML += `#hand .card_parent:nth-child(${
          i + 1
        }) {left: ${50 - (Math.round(array.length / 2) - (i + 1)) * 5}%;}`;
      } else if (i + 1 == Math.round(array.length / 2)) {
        cards_style.innerHTML += `#hand .card_parent:nth-child(${
          i + 1
        }) {left: ${50}%;}`;
      } else {
        cards_style.innerHTML += `#hand .card_parent:nth-child(${
          i + 1
        }) {left: ${50 + (i + 1 - Math.round(array.length / 2)) * 5}%;}`;
      }
    }
  });
};

export const finish_game = () => {
  document.querySelector("div.buttons").style.display = "none";
  document.querySelector("div.pile").style.display = "none";
  document.querySelector("div#hand").style.display = "none";
  document.querySelector("input#restart").style.display = "block";
};
