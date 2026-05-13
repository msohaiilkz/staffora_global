const express = require('express')
const { body, validationResult } = require('express-validator')
const { createClient } = require('@supabase/supabase-js')
const { sendApplicationNotification, sendApplicationConfirmation } = require('../emails/sender')
const upload = require('../middleware/upload')

const router  = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const validateApplication = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('jobSlug').notEmpty().withMessage('Job slug is required'),
]

// POST /api/applications
router.post('/', upload.single('cv'), validateApplication, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, phone, coverNote, jobTitle, jobSlug } = req.body
  const cvUrl      = req.file?.supabaseUrl  || null
  const cvFileName = req.file?.originalname || null

  try {
    const { data, error } = await supabase
      .from('job_applications')
      .insert([{
        name, email, phone,
        cover_note: coverNote,
        job_title: jobTitle,
        job_slug: jobSlug,
        cv_url: cvUrl,
        cv_file_name: cvFileName
      }])
      .select()
      .single()

    if (error) throw error

    try {
      await sendApplicationNotification({ name, email, phone, jobTitle, cvUrl, coverNote })
      await sendApplicationConfirmation({ name, email, jobTitle })
    } catch (emailErr) {
      console.error('Email error:', emailErr)
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. We will review and get back to you.',
      id: data.id
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit application. Please try again.' })
  }
})

module.exports = router
