export const nseIndexData = async () => {
  var myHeaders = new Headers();
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
  );
  myHeaders.append("Accept-Language", "en,gu;q=0.9,hi;q=0.8");
  myHeaders.append("Accept-Encoding", "gzip, deflate, br");
  myHeaders.append("Host", "www.nseindia.com");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Cache-Control", "no-cache");
  myHeaders.append("Connection", "keep-alive");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return await fetch("https://www.nseindia.com/api/allIndices", requestOptions);
};
