jQuery(document).ready(function () {
  function convertTZ(date, tzString = "Europe/Moscow") {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  function getDates(d = new Date()) {
    const moscowDate = convertTZ(d);
    const hour = moscowDate.getHours();
    const minute = moscowDate.getMinutes();

    if (hour < 12 || (hour === 12 && minute < 30)) return [d, d];

    const tomorrow = new Date(d);
    tomorrow.setDate(d.getDate() + 1);

    if (hour > 19 || (hour === 19 && minute > 30)) {
      return [tomorrow, tomorrow];
    }

    return [new Date(d), tomorrow];
  }

  function defineStartDates(today = new Date()) {
    const dates = getDates(today);
    const formatter = new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
    });

    return dates.map((d) => formatter.format(d));
  }

  function getLinkText(time, day) {
    return `Иду ${day} в ${time} МСК`;
  }

  function updateLinkText({ time, $el, day }) {
    if ($el.length > 0) {
      $el.text(getLinkText(time, day));
    }
  }

  const [date12, date19] = defineStartDates();
  [
    {
      time: "12:00",
      $el: jQuery(".eg-but-12 a"),
      day: date12,
    },
    {
      time: "19:00",
      $el: jQuery(".eg-but-19 a"),
      day: date19,
    },
  ].forEach((x) => updateLinkText(x));
});
