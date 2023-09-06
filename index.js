const express = require('express')
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express()
app.use(cors());
app.use( express.json() )

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.post('/send-email', async (req,res) => { 

    const { name, email, subject, message } = req.body;
    const token = process.env.SENDGRID_API_KEY;
    sgMail.setApiKey(token);
    
    const msg = {
        to: 'chenshinzie@gmail.com',
        from: 'chenshinzie@gmail.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
        }

    if (!msg) {
        res.status(418).send( {message: 'We need a message!'})
    }

    try {
        await sgMail.send(msg);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while sending the email' });
    }

})

app.listen(process.env.PORT || 3000)
