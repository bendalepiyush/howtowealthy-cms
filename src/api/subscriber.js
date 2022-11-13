export const subscibeByEmail = async (email, fname, lname) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("fname", fname);
  urlencoded.append("lname", lname);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  // return await fetch(
  //   "http://127.0.0.1:5001/howtowealthy/us-central1/addSubscriber",
  //   requestOptions
  // );

  return await fetch(
    "https://us-central1-howtowealthy.cloudfunctions.net/addSubscriber",
    requestOptions
  );
};
