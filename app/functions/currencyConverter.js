import {getNetworkStatu} from './NetworkState';

console.log('Function GOES HERE');
const API_KEY = '8431c148e217d19f195a';

export function convertAmount(
  from_to,
  amount,
  setisFetching,
  setresult,
  netState,
) {
  console.log({netState});
  if (netState) {
    setisFetching(true);
    fetch(
      'https://free.currconv.com/api/v7/convert?q=' +
        from_to +
        '&compact=ultra&apiKey=' +
        API_KEY,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400) {
          alert(data.error);
          setisFetching(false);

          return;
        } else {
          const RESPONSE = Object.values(data)[0] * amount;
          setisFetching(false);
          console.log({data});

          setresult(RESPONSE.toFixed(2));
        }
      });
  } else {
    alert('OFFLINE !! ');
    setisFetching(false);
  }
}
