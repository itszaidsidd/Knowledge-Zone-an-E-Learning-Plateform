import React from 'react'

const ContactUs = () => {
  return (
    <div className='contact-us'>
      <h1 className='title'>Contact US</h1>
        <div className="contact">
            <form>
                <input type="text" name="name" id="" placeholder='Name' />
                <input type="text" name="subject" id="" placeholder='Subject' />
                <input type="email" name="email" id="" placeholder='Email' />
                <textarea name="msg" id="" placeholder='How can we hlep you?'></textarea>
                <button className='btn' >Send</button>
            </form>
            <div className="address">
                <h1>Knowledge Zone</h1>
                <p>Knowledge Zone, near Amba Viar</p>
                <p>Muzaffarnagar - 251002</p>
                <p>Phone: +91 8126648616</p>
            </div>
        </div>
    </div>
  )
}

export default ContactUs
