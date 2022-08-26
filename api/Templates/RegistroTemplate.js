"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

this.EnviarMail = (pNombreCompleto, pCorreo) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MAILUSER,
    to: pCorreo,
    subject: `Bienvenido a la aplicacion web`,
    html: `
        <div style=" background-color: #81b29a">
            <table border="0" cellspacing="0" cellpadding="0" width="300">
                <img src="/public/img/IsologoMoka.png">
                <tr height="200px">
                    <td>
                        <h1 style="color:#a56905; text-align:center">
                            Bienvenido
                        </h1>
        
                        <p style="color:#ffffff; text-align:center">
                            <span style="color:#000000">
                                ${pNombreCompleto}
                            </span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <p style="color: #a56905;">Siempre listos para brindarle el mejor servicio</p>
                    </td>
                </tr>
            </table>
        </div>
        `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("El correo se envio de manera correcta", +info.response);
    }
  });
};

module.exports = this;
