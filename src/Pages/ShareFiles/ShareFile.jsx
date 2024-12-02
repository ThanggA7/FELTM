import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

function ShareFiles() {
  const [files, setFiles] = useState([]);
  const [shareLink, setShareLink] = useState("");

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

  const handleShare = (fileId) => {
    const link = `http://127.0.0.1:5000/share/${fileId}`;
    setShareLink(link);

    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link has been copied to clipboard!");
    });
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Share Files</h2>

      <TableContainer component={Paper} className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="text-gray-600 font-medium">
                File Name
              </TableCell>
              <TableCell align="center" className="text-gray-600 font-medium">
                File Size
              </TableCell>
              <TableCell align="center" className="text-gray-600 font-medium">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index} hover className="hover:bg-gray-50">
                <TableCell className="text-gray-800">{file.filename}</TableCell>
                <TableCell align="center" className="text-gray-600">
                  {file.file_size}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleShare(file.file_id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg"
                  >
                    Share
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer />
    </div>
  );
}

export default ShareFiles;
