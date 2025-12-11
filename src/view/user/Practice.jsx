import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Chip,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  CircularProgress
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import client from "../../api";
import { useNavigate } from "react-router-dom";

export default function Practice() {
  //------------------------------
  // Filters + Pagination State
  //------------------------------
  const [filters, setFilters] = useState({
    search: "",
    difficulty: "",
    tags: [],
  });

  const [page, setPage] = useState(1);
  const limit = 16;

  //------------------------------
  // Debounce search
  //------------------------------
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(id);
  }, [filters.search]);

  //------------------------------
  // Fetch API
  //------------------------------
  const fetchQuizzes = async () => {
    const params = {
      page,
      limit,
      search: debouncedSearch || undefined,
      difficulty: filters.difficulty || undefined,
      type: filters.type || undefined,
      tags: filters.tags.length ? filters.tags.join(",") : undefined,
    };

    const res = await client.get("/api/quiz/getall", { params });
    return res.data;
  };

  //------------------------------
  // React Query (FIXED queryKey)
  //------------------------------
  const { data, isLoading } = useQuery({
    queryKey: [
      "quizzes",
      page,
      debouncedSearch,
      filters.difficulty,
      filters.type,
      filters.tags.join(","),
    ],
    queryFn: fetchQuizzes,
    keepPreviousData: true,
  }); 
  const navigate = useNavigate();
  //------------------------------
  // Options
  //------------------------------
  const difficultyOptions = ["easy", "medium", "hard"];
  const typeOptions = ["mcq", "msq", "text"];
  const tagOptions = [
    "aptitude", "general knowledge", "technical", "mathematics",
    "english", "reasoning", "logical reasoning", "verbal reasoning",
    "non verbal reasoning", "puzzles", "critical thinking",
    "pattern recognition", "data interpretation", "series",
    "directions", "analogies", "blood relations", "coding reasoning",
    "quantitative aptitude", "arithmetic", "mental ability"
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Practice Quizzes
      </Typography>

      {/* ---------------- FILTERS ---------------- */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>

        {/* Search */}
        <TextField
          label="Search Quiz"
          size="small"
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
          sx={{ minWidth: 200 }}
        />

        {/* Difficulty */}
        <TextField
          select
          label="Difficulty"
          size="small"
          value={filters.difficulty}
          sx={{ minWidth: 150 }}
          onChange={(e) =>
            setFilters((f) => ({ ...f, difficulty: e.target.value }))
          }
        >
          <MenuItem value="">All</MenuItem>
          {difficultyOptions.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>

        {/* Type */}
      

        {/* Tags Multi-select */}
        <Autocomplete
          multiple
          size="small"
          sx={{ minWidth: 300 }}
          value={filters.tags}
          options={tagOptions}
          onChange={(e, val) => setFilters((f) => ({ ...f, tags: val }))}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} key={option} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Tags" size="small" />
          )}
        />
      </Box>

      {/* ---------------- LOADING ---------------- */}
      {isLoading && (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {/* ---------------- QUIZ EMPTY ---------------- */}
      {!isLoading && data?.data?.length === 0 && (
        <Typography>No quizzes found.</Typography>
      )}

      {/* ---------------- QUIZ GRID ---------------- */}
      <Box mt={3}>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
          {data?.data?.map((quiz) => (
            <Card
              key={quiz._id}
              sx={{
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                boxShadow: 2,
                minHeight: "240px",
                position: "relative",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  {quiz.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  {quiz.description}
                </Typography>

                <Box mt={1.5} display="flex" gap={1} flexWrap="wrap">
                  <Chip label={quiz.difficulty} size="small" variant="outlined" />
                  <Chip label={quiz.type} size="small" variant="outlined" />

                  {quiz.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    right: "10px",
                    borderRadius: 1.5,
                  }}
                  onClick={() => navigate(`/dashboard/attempt/${quiz._id}`)}
                >
                  Attempt
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* ---------------- PAGINATION ---------------- */}
      {data?.totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={data?.totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
