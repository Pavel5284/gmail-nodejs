const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN
let smtp_password = process.env.SMTP_PASSWORD


    let transporter = nodemailer.createTransport({
        //service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        tls: {
            rejectUnauthorized: false
        },
        secure: true, // true for 465, false for other ports
        auth: {
            user: smtp_login, // generated ethereal user
            pass: smtp_password, // generated ethereal password
        },
    });

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.post('/sendMessage', async function (req, res) {
        let{name, email, subject, message} = req.body


        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"HR WANTS ME" <portfolio.pavel528418@gmail.com>', // sender address
            to: "pavel528418@gmail.com, pavel5284@mail.ru", // list of receivers
            subject: "HR WANTS ME", // Subject line
            //text: "Сообщение успешно доставлено с сайта портфолио", // plain text body
            html: `<b>Сообщение успешно доставлено с сайта портфолио</b>
                <div>name: ${name}</div> 
                <div>email: ${email}</div> 
                <div>subject: ${subject}</div> 
                 <div>message: ${message}</div>` // html body
        });

        res.send('test123')


        console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    })

let port = process.env.PORT || 3010

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
