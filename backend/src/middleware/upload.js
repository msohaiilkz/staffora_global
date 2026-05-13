const multer = require('multer')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Store in memory first, then upload to Supabase
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and Word documents are allowed'))
    }
  }
})

// After multer, upload to Supabase storage
const uploadToSupabase = async (req, res, next) => {
  if (!req.file) return next()

  try {
    const fileName = `${Date.now()}-${req.file.originalname.replace(/\s/g, '_')}`
    const { data, error } = await supabase.storage
      .from('cvs')
      .upload(fileName, req.file.buffer, { contentType: req.file.mimetype })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage.from('cvs').getPublicUrl(fileName)
    req.file.supabaseUrl = publicUrl
    next()
  } catch (err) {
    console.error('Supabase upload error:', err)
    req.file.supabaseUrl = null
    next()
  }
}

module.exports = upload
