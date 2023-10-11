document.addEventListener("DOMContentLoaded", function () {
  // Handle gift card purchase
  const purchaseForm = document.getElementById("giftCardForm");
  purchaseForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const cvv = document.getElementById("cvv").value;
    const amount = document.getElementById("amount").value;

    // Send a POST request to the server to process the gift card purchase
    try {
      const response = await fetch("/purchase-gift-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, cardNumber, cvv, amount }),
      });
      if (response.ok) {
        // Purchase successful
        console.log("Gift card purchased successfully.");
        purchaseForm.reset();
      } else {
        console.error("Error purchasing gift card.");
      }
    } catch (error) {
      console.error(error);
    }
  });

  
    // Handle gift card balance check
  const checkButton = document.querySelector("#checkGiftCardBalanceForm button[type='submit']");
  checkButton.addEventListener("click", async function (event) {
    event.preventDefault();

    // Get form data for checking the gift card balance
    const checkName = document.getElementById("checkName").value;
    const checkCardNumber = document.getElementById("checkCardNumber").value;

    try {
      const response = await fetch("/check-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: checkName, cardNumber: checkCardNumber }),
      });

      if (response.ok) {
        const data = await response.json();

        // Display gift card details on the page
        const cardDetailsDiv = document.getElementById("card-details-display");
        if (data.balance !== undefined) {
          const cardInfo = `
            <p>Name: ${checkName}</p>
            <p>Card Number: ${checkCardNumber}</p>
            <p>Amount: $${data.balance}`
          ;
          cardDetailsDiv.innerHTML = cardInfo;
        } else {
          cardDetailsDiv.innerHTML = "Gift card not found.";
        }
      } else {
        // Handle error (e.g., show an error message)
        console.error("Error checking gift card balance.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });


});


const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/**
   * Easy event listener function
   */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

/**
     * Easy on scroll event listener
     */
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

/**
   * Navbar links active state on scroll
   */
let navbarlinks = select("#navbar .scrollto", true);
const navbarlinksActive = () => {
  let position = window.scrollY + 200;
  navbarlinks.forEach((navbarlink) => {
    if (!navbarlink.hash) return;
    let section = select(navbarlink.hash);
    if (!section) return;
    if (
      position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
    ) {
      navbarlink.classList.add("active");
    } else {
      navbarlink.classList.remove('active');
    }
  });
};
window.addEventListener("load", navbarlinksActive);
onscroll(document, navbarlinksActive);

/**
   * Scrolls to an element with header offset
   */
const scrollto = (el) => {
  let header = select("#header");
  let offset = header.offsetHeight;

  if (!header.classList.contains("header-scrolled")) {
    offset -= 20;
  }

  let elementPos = select(el).offsetTop;
  window.scrollTo({
    top: elementPos - offset,
    behavior: "smooth",
  });
};

/**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
let selectHeader = select("#header");
if (selectHeader) {
  const headerScrolled = () => {
    if (window.scrollY > 100) {
      selectHeader.classList.add("header-scrolled");
    } else {
      selectHeader.classList.remove("header-scrolled");
    }
  };
  window.addEventListener("load", headerScrolled);
  onscroll(document, headerScrolled);
}
