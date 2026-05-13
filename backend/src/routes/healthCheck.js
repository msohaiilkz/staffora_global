const express = require('express')
const { body, validationResult } = require('express-validator')
const { createClient } = require('@supabase/supabase-js')
const { sendHealthCheckReport } = require('../emails/sender')

const router  = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const validateHealthCheck = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('overallScore').isInt({ min: 0, max: 100 }).withMessage('Invalid score'),
]

// POST /api/hr-health-check
router.post('/', validateHealthCheck, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    name, email, company,
    overallScore, hiringScore, onboardingScore,
    performanceScore, retentionScore, hrSetupScore,
    recommendation
  } = req.body

  try {
    const { data, error } = await supabase
      .from('hr_health_checks')
      .insert([{
        name, email, company,
        overall_score: overallScore,
        hiring_score: hiringScore,
        onboarding_score: onboardingScore,
        performance_score: performanceScore,
        retention_score: retentionScore,
        hr_setup_score: hrSetupScore,
        recommendation
      }])
      .select()
      .single()

    if (error) throw error

    try {
      await sendHealthCheckReport({
        name, email, overallScore,
        hiringScore, onboardingScore,
        performanceScore, retentionScore,
        hrSetupScore, recommendation
      })
    } catch (emailErr) {
      console.error('Email error:', emailErr)
    }

    res.status(201).json({
      success: true,
      message: 'Your HR Health Check report has been sent to your email.',
      id: data.id
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save results. Please try again.' })
  }
})

module.exports = router
