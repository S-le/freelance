document.addEventListener("DOMContentLoaded", function () {
  const startEl = document.querySelector(".mega-mama-start-date span");
  if (startEl) {
    changeDate();
  }

  function convertTZ(date, tzString = "Europe/Moscow") {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  function getDateFromString(dateString) {
    const regex = /(\d{2})\.(\d{2})/;
    const match = dateString.match(regex);

    if (!match) {
      return null;
    }

    const day = parseInt(match[1]);
    const month = parseInt(match[2]) - 1;

    const year = new Date().getFullYear();
    const date = new Date(year, month, day);

    return date;
  }

  function setStartDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const startDate = `с ${day}.${month}`;

    startEl.innerText = startDate;
  }

  function changeDate() {
    const startDate = getDateFromString(startEl.innerText);
    if (startDate === null) {
      return;
    }

    const today = convertTZ(new Date(), "Europe/Moscow");
    if (today.getDay() !== 1) {
      today.setDate(today.getDate() + 8 - today.getDay());
    }

    setStartDate(today);
  }
});
