export default function () {
  const isLocalhost =
    window.location.host.indexOf("127.0.0.1") != -1 ||
    window.location.host.indexOf("localhost") != -1;

  const localApiUrl = "";
  const prodApiUrl = "";

  // when fetching data from the api we need to know what the url is
  // It is different if you are developing locally or have the site deployed
  window.apiUrl = isLocalhost ? localApiUrl : prodApiUrl;
}
