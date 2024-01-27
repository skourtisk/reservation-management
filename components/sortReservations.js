export function getTotalPeople(PRs) {
  let totalPeople = 0;
  PRs.forEach((pr) => {
    pr.reservations
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n != "")
      .forEach((resv) => {
        totalPeople += parseInt(
          resv
            .match(/[0-9]+ατ|[0-9]+\s+ατ/gi)
            .join("")
            .replace(" ", "")
            .toUpperCase()
        );
      });
  });

  return totalPeople;
}

export function getPeopleOfPR(reservations) {
  if (reservations == "") {
    return "No reservations found";
  }
  reservations = reservations

    .split("\n")
    .map((n) => n.trim())
    .filter((n) => n != "");
  try {
    reservations = reservations.map((resv) => {
      return (resv = {
        numOfPeople: parseInt(
          resv
            .match(/[0-9]+ατ|[0-9]+\s+ατ/gi)
            .join("")
            .replace(" ", "")

            .toUpperCase()
        ),
      });
    });
    //caclucate number of people total
    let totalPeople = 0;
    reservations.forEach((resv) => {
      totalPeople += parseInt(resv.numOfPeople);
      return totalPeople;
    });
  } catch (err) {
    return "Wrong format";
  }
}

export function getReservations(reservations) {
  if (reservations == "") {
    return "No reservations found";
  }
  reservations = reservations
    .split("\n")
    .map((n) => n.trim())
    .filter((n) => n != "");
  try {
    reservations = reservations.map((resv) => {
      return (resv = {
        numOfPeople: parseInt(
          resv
            .match(/[0-9]+ατ|[0-9]+\s+ατ/gi)
            .join("")
            .replace(" ", "")

            .toUpperCase()
        ),
        nameOfResv: resv
          .match(/[Ά-ΏΑ-Ωα-ωά-ώ]{3,}|[Ά-ΏΑ-Ωα-ωά-ώ]/g)
          .filter((n) => {
            if (
              n.length > 2 &&
              n.match(/ΠΡΙΜΦ|ΠΡΕΦ|πριμφ|πρεμφ|πρεφ/gi) == null
            ) {
              return n;
            }
          })
          .join("")
          .toUpperCase(),

        numOfBottles: {
          simpleBottles: resv.match(/[0-9]φ|[0-9]\s+φ/gi)
            ? parseInt(
                resv
                  .match(/[0-9]φ|[0-9]\s+φ/gi)
                  .join("")

                  .replace(/[^0-9]/g, "")
              )
            : 0,
          doubleBottles: resv.match(
            /[0-9]ΠΡΙΜΦ|[0-9]ΠΡΕΦ|[0-9]\s+πριμφ|[0-9]\s+πρεμφ/gi
          )
            ? parseInt(
                resv
                  .match(/[0-9]ΠΡΙΜΦ|[0-9]ΠΡΕΦ|[0-9]\s+πριμφ|[0-9]\s+πρεμφ/gi)
                  .join("")
                  .replace(/[^0-9]/g, "")
              )
            : 0,
        },
      });
    });
    //caclucate number of people total
    let totalPeople = 0;
    reservations.forEach((resv) => {
      totalPeople += parseInt(resv.numOfPeople);
    });

    //sort by number of doublebottles first, then simplebottles, then names

    reservations.sort((a, b) => {
      if (a.numOfBottles.doubleBottles > b.numOfBottles.doubleBottles) {
        return -1;
      } else if (a.numOfBottles.doubleBottles < b.numOfBottles.doubleBottles) {
        return 1;
      } else {
        if (a.numOfBottles.simpleBottles > b.numOfBottles.simpleBottles) {
          return -1;
        } else if (
          a.numOfBottles.simpleBottles < b.numOfBottles.simpleBottles
        ) {
          return 1;
        } else {
          if (a.nameOfResv > b.nameOfResv) {
            return 1;
          } else if (a.nameOfResv < b.nameOfResv) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    });
    //get checkbox value

    //create output
    let output = "";
    reservations.forEach((resv) => {
      output += `${resv.nameOfResv} ${resv.numOfPeople + "ΑΤ"}${
        resv.numOfBottles.simpleBottles + resv.numOfBottles.doubleBottles > 0
          ? " - "
          : " "
      }${
        resv.numOfBottles.simpleBottles > 0
          ? resv.numOfBottles.simpleBottles + "Φ "
          : ""
      }${
        resv.numOfBottles.doubleBottles > 0
          ? resv.numOfBottles.doubleBottles + "ΠΡΙΜΦ"
          : ""
      }\n`;
    });
    return output;
  } catch (err) {
    return "Wrong format";
  }
}
