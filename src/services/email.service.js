export async function sendMailEthereal(mail) {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL,
      to: [mail,'carlamontani@gmail.com', process.env.EMAIL],
      subject: "Nuevo registro",
      html: `<h1>hola nuevo ${mail}</h1>`,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
