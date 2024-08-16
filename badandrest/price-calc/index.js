document.addEventListener("DOMContentLoaded", function () {
  const ID_DISCOUNT_PRICE = "calc_discount_price";
  const PRICE_CLASS = "has-discount-price";

  const itemsMap = new Map([
    ["Размещение организации на картах".toLocaleLowerCase(), 2500],
    ["Разработка логотипа".toLocaleLowerCase(), 0],
    ["Нейминг организации".toLocaleLowerCase(), 0],
    ["Упаковка сообществ: ВК, Телеграм".toLocaleLowerCase(), 18000],
    ["Разработка сайта".toLocaleLowerCase(), 20000],
    ["Аудит".toLocaleLowerCase(), 8000],
    ["Дизайн фона Авито-магазина".toLocaleLowerCase(), 1500],
    ["Регистрация товарного знака".toLocaleLowerCase(), 0],
  ]);

  const isElementExist = (el) => el != null;

  const getContainer = (el) => {
    if (!isElementExist(el)) return null;

    let parentElement = el.parentElement;
    if (!isElementExist(parentElement)) return null;

    while (
      isElementExist(parentElement) &&
      !parentElement.classList.contains("t-container")
    ) {
      parentElement = parentElement.parentElement;
    }

    return parentElement;
  };

  const getInputBlock = () => {
    var $hiddenInput = $container.querySelector(
      "input.t-calc__hiddeninput[name=Formula]"
    );

    if (isElementExist($hiddenInput)) {
      return $hiddenInput.parentElement;
    }

    return null;
  };

  function getDiscountPrice($selectedInputs) {
    let price = 0;

    for ($input of $selectedInputs) {
      price += itemsMap.get($input.value.trimEnd().toLocaleLowerCase()) || 0;
    }

    return price;
  }

  function appendDiscountPrice(discountPrice) {
    const $block = getInputBlock();
    if (!$block) return;

    removeDiscountPriceElement($block);

    const content = document.createElement("div");

    content.id = ID_DISCOUNT_PRICE;
    content.style.fontSize = "28px";
    content.style.fontFamily = "Raleway";
    content.style.fontWieght = "700";
    content.style.marginLeft = "65px";
    content.style.color = "#ec9a33";

    content.innerHTML = `
			<span>${discountPrice}</span>
			<span>руб.</span>		
	`;
    $block.appendChild(content);
    addPriceStyle($block);
  }

  function addPriceStyle($block) {
    const $el = $block.querySelector("div.t-calc__wrapper");
    if ($el) {
      $el.classList.add(PRICE_CLASS);
    }
  }

  function addDiscount() {
    const $selectedInputs = $list.querySelectorAll("input:checked");
    if (!$selectedInputs.length) {
      removeDiscount();
      return;
    }

    const discountPrice = getDiscountPrice($selectedInputs);
    appendDiscountPrice(discountPrice);
  }

  function removePriceStyle($block) {
    const $el = $block.querySelector(`div.${PRICE_CLASS}`);
    if (isElementExist($el)) {
      $el.classList.remove(PRICE_CLASS);
    }
  }

  function removeDiscountPriceElement($block) {
    const $discountPrice = $block.querySelector(`#${ID_DISCOUNT_PRICE}`);
    if (isElementExist($discountPrice)) {
      $discountPrice.remove();
    }
  }

  function removeDiscount() {
    const $block = getInputBlock();
    if (!isElementExist($block)) return;

    removeDiscountPriceElement($block);
    removePriceStyle($block);
  }

  const priceCalcAnchorInput = document.querySelector(
    "input[value=price_calc]"
  );
  const $container = getContainer(priceCalcAnchorInput);
  if ($container == null) return;

  const $list = $container.querySelector("ul.t-checkboxes__wrapper");
  if (!$list) return;

  const $sale = $container.querySelector("input[name=sale_bandr]");
  if (!isElementExist($sale)) return;

  $sale.addEventListener("change", function (event) {
    if (event.type !== "change") return;

    if (event.target.checked) {
      addDiscount();
    } else {
      removeDiscount();
    }
  });

  $list.querySelectorAll("input[type=checkbox]").forEach((el) => {
    el.addEventListener("change", () => {
      if ($sale.checked) {
        addDiscount();
      }
    });
  });
});
