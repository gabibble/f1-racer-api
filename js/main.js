//connect to API

const getData = async (year, round) => {
  let response = await axios.get(
    `https://ergast.com/api/f1/${year}/${round}/driverStandings.json`
  );
  let data =
    response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  console.log(data);
  console.log(data[0]);

  console.log(data[1].Driver.familyName);
  return data;
};

getData(2020, 1);

const create_rows = (pos, fname, lname, url, nat, spon, wins, pts) => {
  //clears data
  const html = `<div class="row" id="driver-row">
            <div class="col">${pos}</div>
            <div class="col" id="driver-name">
            <a href="${url}">${fname} ${lname}</a></div>
            <div class="col">${nat}</div>
            <div class="col">${spon}</div>
            <div class="col">${wins}</div>

            <div class="col">${pts}</div>
          </div>`;
  document.querySelector("#driver-rows").insertAdjacentHTML("beforeend", html);
};

const load_data = async (y, r) => {
  const drivers = await getData(y, r);
  drivers.forEach((driver) =>
    create_rows(
      driver.position,
      driver.Driver.givenName,
      driver.Driver.familyName,
      driver.Driver.url,
      driver.Driver.nationality,
      driver.Constructors[0].name,
      driver.wins,

      driver.points
    )
  );
};

const form = document.querySelector("#yearform");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //clears current data
  document.querySelector("#driver-rows").innerHTML = ``;
  let year = document.querySelector("#year").value;
  let round = document.querySelector("#round").value;
  console.log(year, round);
  document.querySelector(
    "#table-heading"
  ).innerHTML = `Displaying data for year ${year} round ${round}`;
  load_data(year, round);
});

load_data(2022, 1);
// load_data(2019, 1);
