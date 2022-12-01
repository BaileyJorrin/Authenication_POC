/*This is meant to be used to utilize secure GETs */

export async function fetchApiSecure(accessToken, requestEndpoint) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    mode:'cors',
    headers: headers
  };

  return fetch(requestEndpoint, options)
    .then(response => response.json())
    .catch(error => console.log(error));
}
