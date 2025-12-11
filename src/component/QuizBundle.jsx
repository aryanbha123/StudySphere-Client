import { Face, Timeline, Whatshot } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  Fade,
  CardMedia,
  CardActions,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

const QUIZZES = [
  {
    id: 1,
    title: 'DBMS Basics',
    description: 'Test your understanding of Database Management Systems fundamentals.',
    category: 'Trending',
    image: 'https://picsum.photos/300/200?random=1'
  },
  {
    id: 2,
    title: 'Advanced SQL',
    description: 'Challenge your SQL skills with complex queries and joins.',
    category: 'Popular',
    image: 'https://picsum.photos/300/200?random=2'
  },
  {
    id: 3,
    title: 'Data Structures',
    description: 'Evaluate your knowledge of stacks, queues, trees, and graphs.',
    category: 'New',
    image: 'https://picsum.photos/300/200?random=3'
  },
  {
    id: 4,
    title: 'Operating Systems',
    description: 'Dive into processes, threads, memory management, and scheduling.',
    category: 'Trending',
    image: 'https://picsum.photos/300/200?random=4'
  },
  {
    id: 5,
    title: 'Computer Networks',
    description: 'Test your knowledge of TCP/IP, routing, and OSI model layers.',
    category: 'Popular',
    image: 'https://picsum.photos/300/200?random=5'
  },
  {
    id: 6,
    title: 'Algorithms',
    description: 'Assess your skills with sorting, searching, and optimization algorithms.',
    category: 'New',
    image: 'https://picsum.photos/300/200?random=6'
  },
  {
    id: 7,
    title: 'Computer Architecture',
    description: 'Understand CPU design, pipelining, and instruction sets.',
    category: 'Trending',
    image: 'https://picsum.photos/300/200?random=7'
  },
  {
    id: 8,
    title: 'Machine Learning',
    description: 'Basics of supervised and unsupervised learning models.',
    category: 'Popular',
    image: 'https://picsum.photos/300/200?random=8'
  },
  {
    id: 9,
    title: 'Artificial Intelligence',
    description: 'Test your AI knowledge on search, planning, and reasoning.',
    category: 'New',
    image: 'https://picsum.photos/300/200?random=9'
  },
  {
    id: 10,
    title: 'Cyber Security',
    description: 'Explore cryptography, attacks, and defense mechanisms.',
    category: 'Trending',
    image: 'https://picsum.photos/300/200?random=10'
  },
  {
    id: 11,
    title: 'Web Development',
    description: 'Covers HTML, CSS, JavaScript, and modern frameworks.',
    category: 'Popular',
    image: 'https://picsum.photos/300/200?random=11'
  },
  {
    id: 12,
    title: 'Mobile Development',
    description: 'Test your skills on Android, iOS, and cross-platform tools.',
    category: 'New',
    image: 'https://picsum.photos/300/200?random=12'
  },
  {
    id: 13,
    title: 'Cloud Computing',
    description: 'Check your knowledge of AWS, Azure, and GCP fundamentals.',
    category: 'Trending',
    image: 'https://picsum.photos/300/200?random=13'
  },
  {
    id: 14,
    title: 'Big Data',
    description: 'Test your knowledge of Hadoop, Spark, and distributed systems.',
    category: 'Popular',
    image: 'https://picsum.photos/300/200?random=14'
  },
  {
    id: 15,
    title: 'DevOps',
    description: 'Cover CI/CD, Docker, Kubernetes, and monitoring tools.',
    category: 'New',
    image: 'https://picsum.photos/300/200?random=15'
  },
  {
    id: 16,
    title: 'Software Engineering',
    description: 'Covers SDLC, agile methodologies, and design principles.',
    category: 'Trending',
    image: 'https://picsum.photos/300/200?random=16'
  },
  {
    id: 17,
    title: 'Programming in C',
    description: 'Assess your C programming skills with pointers and memory.',
    category: 'Popular',
    image: 'https://picsum.photos/300/200?random=17'
  },
  {
    id: 18,
    title: 'Java Programming',
    description: 'OOP, collections, and concurrency concepts tested.',
    category: 'New',
    image: 'https://picsum.photos/300/200?random=18'
  },
  {
    id: 19,
    title: 'Python Programming',
    description: 'Covers syntax, libraries, and problem-solving skills.',
    category: 'Trending',
    image: 'https://picsum.photos/300/200?random=19'
  },
  {
    id: 20,
    title: 'Data Science',
    description: 'Statistics, visualization, and predictive modeling basics.',
    category: 'Popular',
    image: 'https://picsum.photos/300/200?random=20'
  }
];

export default function QuizBundle() {
  return (
    <Box sx={{ p: 4 , display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center"}}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Explore Quizzes
      </Typography>

      <Grid sx={{display:"flex",flexDirection:"row",alignItems:"center", justifyContent:"center"}} container spacing={3}>
        {QUIZZES.map((quiz) => (
          <Grid item xs={12} sm={3} md={4} lg={4} xl={4} key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`} style={{ textDecoration: 'none' }}>
              <Card
                elevation={0}
                sx={{
                  maxWidth: 345,
                  border: '1px solid #eee',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
                }}
              >
                <CardMedia sx={{ height: 140 }} image={quiz.image} />

                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {quiz.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {quiz.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Chip
                    variant="outlined"
                    color="info"
                    size="small"
                    label={quiz.category}
                    icon={
                      quiz.category === 'Trending' ? (
                        <Timeline />
                      ) : quiz.category === 'Popular' ? (
                        <Whatshot />
                      ) : (
                        <></>
                      )
                    }
                  />

                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
