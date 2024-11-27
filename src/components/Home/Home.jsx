import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";

function Home() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/files");
        setFiles(response.data.files || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const APISHARE = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedFiles = await axios.get("http://127.0.0.1:5000/files");
      setFiles(updatedFiles.data.files || []);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(`http://127.0.0.1:5000/download/${link}`);
  };

  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Welcome Back, Thang</p>
        <div>
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold">Upload Files</p>
        <div className="w-full h-[200px] border rounded-lg flex items-center justify-center text-gray-500">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Click to Upload
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={APISHARE}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold">Your Files</p>
        <div className="mt-4">
          <TableContainer component={Paper} className="shadow-md">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>File Size</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Last Modified</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFiles.map((file, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{file.filename}</TableCell>
                    <TableCell align="center">{file.file_size}</TableCell>
                    <TableCell align="center">{file.upload_date}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCopy(file.file_id)}
                        disabled={file.link === "N/A"}
                      >
                        Copy Link
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
