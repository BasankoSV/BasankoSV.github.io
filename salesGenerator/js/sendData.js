async function sendData(form) {
  try {
    const response = await fetch('mailer/smart.php', {
      method: 'POST',
      body: new FormData(form),
    })
  const data = await response;
  console.log('DATA: ', data);
  } catch (e) {
    console.error(e);
  }
}
export default sendData