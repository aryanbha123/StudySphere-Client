import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function FAQ () {
  const faqs = [
    {
      question: 'What is StudySphere?',
      answer:
        'StudySphere is a peer learning platform where students can practice quizzes, coding, and improve their skills together.'
    },
    {
      question: 'Is it free to use?',
      answer:
        'Yes! StudySphere offers free quizzes and learning resources. Premium content may be added later.'
    },
    {
      question: 'How can I contribute quizzes?',
      answer:
        'You can create an account, go to the “Contribute” section, and submit your quiz. Our team will review it before publishing.'
    },
    {
      question: 'Do I need to create an account?',
      answer:
        'You can browse and attempt some quizzes without an account, but creating one unlocks progress tracking, custom recommendations, and contributions.'
    },
    {
      question: 'Can I track my quiz performance?',
      answer:
        'Yes. When logged in, your quiz attempts and scores are saved so you can monitor improvement over time.'
    },
    {
      question: 'What topics are covered?',
      answer:
        'We currently offer quizzes on DBMS, SQL, Data Structures, Algorithms, Operating Systems, and Computer Networks, with more being added regularly.'
    },
    {
      question: 'Is there a coding practice section?',
      answer:
        'Yes. Apart from MCQs, you can practice real coding challenges with multiple test cases and solution viewing.'
    },
    {
      question: 'Who can use StudySphere?',
      answer:
        'It’s built for students, freshers, and professionals preparing for exams, interviews, and competitive coding.'
    }
  ]

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Typography
        variant='h4'
        align='center'
        fontWeight='bold'
        gutterBottom
        sx={{ mb: 4 }}
      >
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion
          elevation={0}
          key={index}
          sx={{
            mb: 2,
            borderRadius: 2,
            // boxShadow: 2,
            border:"1px solid #eee" ,
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: 'grey.50', borderRadius: '8px 8px 0 0' }}
          >
            <Typography variant='subtitle1' fontWeight='bold'>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' color='text.secondary'>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}