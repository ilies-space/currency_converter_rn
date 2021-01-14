import {Alert} from 'react-native';

const API_KEY = '8431c148e217d19f195a';

export function convertAmount(
  from_to,
  amount,
  setisFetching,
  setresult,
  netState,
) {
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
          setresult(RESPONSE.toFixed(2));
        }
      });
  } else {
    alert('OFFLINE !! ');
    Alert.alert('Network error ! ', 'please connect to the internet.', [
      {
        text: 'cancel',
      },
    ]);
    setisFetching(false);
  }
}
