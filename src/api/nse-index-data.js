export const nseIndexData = async () => {
  var requestOptions = {
    method: "POST",
    header: {
      "content-type": "application/json",
    },
  };

  var response = await fetch(
    "https://asia-south1-howtowealthy.cloudfunctions.net/nseFetchIndexDataPython",
    requestOptions
  );

  return await response.json();
};
