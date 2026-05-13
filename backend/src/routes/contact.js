const express = require('express')
const { body, validationResult } = require('express-validator')
const { createClient } = require('@supabase/supabase-js')
const { sendContactNotification, sendContactConfirmation } = require('../emails/sender')

const router  = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 20 }).withMessage('Message must be at least 20 characters'),
  body('inquiryType').notEmpty().withMessage('Inquiry type is required'),
]

// POST /api/contact
router.post('/', validateContact, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, phone, company, inquiryType, message } = req.body

  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, phone, company, inquiry_type: inquiryType, message }])
      .select()
      .single()

    if (error) throw error

    try {
      await sendContactNotification({ name, email, phone, company, inquiryType, message })
      await sendContactConfirmation({ name, email })
    } catch (emailErr) {
      console.error('Email error:', emailErr)
    }

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. We will get back to you within 24 hours.',
      id: data.id
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit inquiry. Please try again.' })
  }
})

module.exports = router
