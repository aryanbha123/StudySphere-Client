import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Box, Button, CircularProgress, Divider, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";

// Your execution engine URL
const BASE = "http://execution.api.binarykeeda.com";

// Default starter templates
const DEFAULT_SNIPPETS = {
  javascript: `// JavaScript Template
console.log("Hello JavaScript");`,

  python: `# Python Template
print("Hello Python")`,

  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello C++";
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    printf("Hello C");
    return 0;
}`,

  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}`
};

// Base64 encoder
function b64(str = "") {
  try {
    if (typeof window !== "undefined") {
      return window.btoa(unescape(encodeURIComponent(str)));
    }
    return Buffer.from(str, "utf8").toString("base64");
  } catch {
    return "";
  }
}

export default function Playground() {
  const [languages, setLanguages] = useState([]);
  const [lang, setLang] = useState(null);
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Judge0 languages
  useEffect(() => {
    async function loadLanguages() {
      try {
        const res = await axios.get(`${BASE}/languages`);
        const list = res.data;

        setLanguages(list);

        // pick a default language (java/js/python/cpp/c)
        const preferred = list.find((l) => {
          const key = l.name.toLowerCase().split(" ")[0];
          return ["javascript", "python", "java", "c", "cpp"].includes(key);
        });

        if (preferred) {
          setLang(preferred);
          const key = preferred.name.toLowerCase().split(" ")[0];
          setCode(DEFAULT_SNIPPETS[key]);
        }
      } catch (err) {
        console.error("Language fetch failed", err);
      }
    }

    loadLanguages();
  }, []);

  // Run Code
  async function runCode() {
    if (!lang) return;

    setLoading(true);
    setOutput(null);

    const payload = {
      language_id: lang.id,
      source_code: b64(code),
      stdin: b64(stdin)
    };

    try {
      const res = await axios.post(
        `${BASE}/submissions?base64_encoded=true&wait=false`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const t = res?.data?.token;
      setToken(t);

      pollResult(t);
    } catch (err) {
      setLoading(false);
      setOutput({ error: "Submission failed." });
    }
  }

  // Poll result
  async function pollResult(t) {
    const url = `${BASE}/submissions/${t}?base64_encoded=true`;

    for (let i = 0; i < 70; i++) {
      const r = await axios.get(url);
      const data = r.data;

      if (data.status?.id > 2) {
        const decode = (v) =>
          v ? decodeURIComponent(escape(window.atob(v))) : "";

        setOutput({
          stdout: decode(data.stdout),
          stderr: decode(data.stderr),
          compile_output: decode(data.compile_output),
          time: data.time,
          memory: data.memory,
          status: data.status?.description
        });

        setLoading(false);
        return;
      }

      await new Promise((res) => setTimeout(res, 700));
    }

    setLoading(false);
    setOutput({ error: "Execution timed out." });
  }

  return (
    <div
      style={{
        padding: 16,
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 350px",
        gap: 16
      }}
    >
      {/* BACKDROP LOADER */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            // backdropFilter: "blur(3px)"
          }}
        >
          <div className="bg-white h-[80px] flex items-center justify-center w-[280px] p-2 rounded-md">
            <Typography variant="body2" >Running...</Typography>
            <CircularProgress size={24} />
          </div>
        </div>
      )}

      {/* LEFT SIDE */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Top Controls */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Select
          size="small"
            value={lang?.id || ""}
            onChange={(e) => {
              const item = languages.find((l) => l.id === Number(e.target.value));
              setLang(item);

              const key = item.name.toLowerCase().split(" ")[0];
              setCode(DEFAULT_SNIPPETS[key] || "");
            }}
          
          >

            {languages.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.name}
              </MenuItem>
            ))}
          </Select>

          <Button
          variant="contained"
            onClick={runCode}
            disabled={loading}
            
          >
            Run
          </Button>
        </div>

        {/* CODE EDITOR */}
        <div style={{ flex: 1 }}>
          <Editor
            height="100%"
            language={lang?.name.toLowerCase().split(" ")[0] || "javascript"}
            value={code}
            theme="vs-dark"
            onChange={(v) => setCode(v)}
            options={{
              fontSize: 14,
              automaticLayout: true
            }}
          />
        </div>

        {/* INPUT */}
       
      </div>

    {/* RIGHT SIDE OUTPUT PANEL */}
<Paper
  elevation={2}
  sx={{
    p: 2,
    borderRadius: 3,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    background: "#fff"
  }}
>
  <Typography variant="h6" sx={{ fontWeight: 600 }}>
    Program Input
  </Typography>

  {/* STDIN INPUT */}
  <TextField
    label="stdin"
    multiline
    minRows={3}
    value={stdin}
    onChange={(e) => setStdin(e.target.value)}
    fullWidth
    sx={{ mb: 2 }}
  />

  <Divider />

  <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
    Output
  </Typography>

  {/* OUTPUT VIEWER */}
  
  {output ? (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        background: "#f8f9fa",
        flex: 1,
        overflowY: "auto"
      }}
    >
      {/* STATUS */}
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontWeight: 600,
          color:
            output?.status === "Accepted"
              ? "green"
              : output.error
              ? "crimson"
              : "#333"
        }}
      >
        Status: {output?.status || output?.error}
      </Typography>

      {/* STDOUT */}
      {output?.stdout && (
        <>
          <Typography sx={{ fontWeight: 600, color: "#333", mb: 0.5 }}>
            Stdout:
          </Typography>
          <Box
            component="pre"
            sx={{
              background: "#1e1e1e",
              color: "#d4d4d4",
              p: 2,
              borderRadius: 1,
              fontSize: "0.85rem",
              whiteSpace: "pre-wrap"
            }}
          >
            {output?.stdout}
          </Box>
        </>
      )}

      {/* STDERR */}
      {output?.stderr && (
        <>
          <Typography sx={{ fontWeight: 600, color: "#b71c1c", mt: 2 }}>
            Stderr:
          </Typography>
          <Box
            component="pre"
            sx={{
              background: "#2b0000",
              color: "#ffb3b3",
              p: 2,
              borderRadius: 1,
              fontSize: "0.85rem",
              whiteSpace: "pre-wrap"
            }}
          >
            {output?.stderr}
          </Box>
        </>
      )}

      {/* COMPILE OUTPUT */}
      {output?.compile_output && (
        <>
          <Typography sx={{ fontWeight: 600, color: "#b71c1c", mt: 2 }}>
            Compile Output:
          </Typography>
          <Box
            component="pre"
            sx={{
              background: "#2b0000",
              color: "#ffb3b3",
              p: 2,
              borderRadius: 1,
              fontSize: "0.85rem",
              whiteSpace: "pre-wrap"
            }}
          >
            {output?.compile_output}
          </Box>
        </>
      )}

      {/* META */}
      <Typography
        variant="caption"
        sx={{ display: "block", mt: 2, color: "#666" }}
      >
        Time: {output?.time}s • Memory: {output?.memory} KB
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={{ mt: 1, color: "#777" }}>
      (no output yet)
    </Typography>
  )}
</Paper>

    </div>
  );
}
