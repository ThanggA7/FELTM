import React, { useState } from "react";
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

function Home() {
  const [files, setFiles] = useState([
    {
      name: "Thang.png",
      sharedUsers: "N/A",
      fileSize: "1 MB",
      lastModified: "Dec 13, 2024",
      link: "https://thangluunhu.xyz/",
    },
    {
      name: "API.zip",
      sharedUsers: "N/A",
      fileSize: "242 MB",
      lastModified: "Dec 12, 2023",
      link: "https://api.nhuthangluu.id.vn/",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    const newFiles = Array.from(uploadedFiles).map((file) => ({
      name: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      lastModified: new Date(file.lastModified).toLocaleDateString,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link copied: " + link);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            multiple
            onChange={handleFileUpload}
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
                    <strong>Shared Users</strong>
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
                    <TableCell>{file.name}</TableCell>
                    <TableCell align="center">{file.sharedUsers}</TableCell>
                    <TableCell align="center">{file.fileSize}</TableCell>
                    <TableCell align="center">{file.lastModified}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCopy(file.link)}
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
