import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Set up storage directory
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Sanitize filename & add timestamp to prevent collisions
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs are allowed"));
    }
  }
});

app.use(express.json());

// API Endpoints
app.get("/api/notes", (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    const notes = files.map(file => {
      const stats = fs.statSync(path.join(uploadDir, file));
      const parts = file.split("-");
      // Format: grade-subject-noteType-timestamp-name.pdf
      const grade = parts[0];
      const subject = parts[1];
      const noteType = parts[2];
      const name = parts.slice(4).join("-");
      
      return {
        id: file,
        grade: grade,
        subject: subject,
        noteType: noteType,
        name: name,
        size: stats.size,
        uploadedAt: stats.mtime,
        url: `/api/download/${file}`
      };
    });
    // Sort by latest
    notes.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to list notes" });
  }
});

app.post("/api/upload", upload.single("note"), (req, res) => {
  const subject = req.body.subject || "misc";
  const grade = req.body.grade || "11th";
  const noteType = req.body.noteType || "notes";
  
  // Basic security check: compare with environment secret
  const adminSecret = process.env.VITE_ADMIN_SECRET || "akshat88s";
  const clientSecret = req.headers['x-admin-secret'];
  
  if (clientSecret !== adminSecret) {
    return res.status(403).json({ error: "Unauthorized: Invalid Laboratory Clearance! 🚨" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Rename file to include grade, subject and noteType
  const oldPath = req.file.path;
  const newFilename = `${grade}-${subject}-${noteType}-${req.file.filename}`;
  const newPath = path.join(uploadDir, newFilename);
  
  try {
    fs.renameSync(oldPath, newPath);
    res.json({
      message: "File uploaded successfully",
      file: {
        id: newFilename,
        grade,
        subject,
        noteType,
        name: req.file.originalname,
        size: req.file.size,
        uploadedAt: new Date(),
        url: `/api/download/${newFilename}`
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to process file" });
  }
});

app.get("/api/download/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    // Set headers to force download and clear caching
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename.split("-").slice(1).join("-")}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.download(filePath, req.params.filename.split("-").slice(1).join("-"));
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.delete("/api/notes/:filename", (req, res) => {
  // Security check: compare with environment secret
  const adminSecret = process.env.VITE_ADMIN_SECRET || "akshat88s";
  const clientSecret = req.headers['x-admin-secret'];
  
  if (clientSecret !== adminSecret) {
    return res.status(403).json({ error: "Unauthorized: Invalid Laboratory Clearance! 🚨" });
  }

  const filename = decodeURIComponent(req.params.filename);
  const filePath = path.join(uploadDir, filename);
  
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      res.json({ message: "File terminated successfully" });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Failed to terminate file" });
    }
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

// Vite middleware setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
