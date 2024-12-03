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
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShareFiles() {
  const [files, setFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(response.data.files || []);
        setSharedFiles(
          response.data.files.filter((file) => file.shared_with_me)
        ); // Ví dụ, lọc file có shared_with_me = true
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data.friends || []);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFiles();
    fetchFriends();
  }, []);

  // Chia sẻ file
  const handleShare = async () => {
    if (!selectedFriend || !selectedFile) {
      toast.error("Vui lòng chọn bạn bè và file để chia sẻ!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:5000/share",
        { fileId: selectedFile, username: selectedFriend },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Đã chia sẻ file với ${selectedFriend}!`);
    } catch (error) {
      console.error("Error sharing file:", error);
      toast.error("Chia sẻ file thất bại!");
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Share Files</h2>

      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          centered
          className="text-white"
        >
          <Tab label="Files Shared With Me" className="text-white" />
          <Tab label="Share Files With Friends" className="text-white" />
        </Tabs>

        {/* Tab 1: Files Shared With Me */}
        {tabIndex === 0 && (
          <TableContainer component={Paper} className="overflow-x-auto mt-4">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell className="text-gray-600 font-medium">
                    File Name
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-gray-600 font-medium"
                  >
                    Shared By
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sharedFiles.map((file, index) => (
                  <TableRow key={index} hover className="hover:bg-gray-50">
                    <TableCell className="text-gray-800">
                      {file.filename}
                    </TableCell>
                    <TableCell align="center" className="text-gray-600">
                      {file.shared_by}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Tab 2: Share Files With Friends */}
        {tabIndex === 1 && (
          <div className="mt-4">
            <div className="flex items-center mb-4">
              {/* Select file to share */}
              <Select
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                displayEmpty
                className="mr-4 bg-gray-800 text-white"
                fullWidth
              >
                <MenuItem value="">Chọn file</MenuItem>
                {files.map((file) => (
                  <MenuItem key={file.file_id} value={file.file_id}>
                    {file.filename}
                  </MenuItem>
                ))}
              </Select>

              {/* Select friend to share with */}
              <Select
                value={selectedFriend}
                onChange={(e) => setSelectedFriend(e.target.value)}
                displayEmpty
                className="mr-4 bg-gray-800 text-white"
                fullWidth
              >
                <MenuItem value="">Chọn bạn bè</MenuItem>
                {friends.map((friend) => (
                  <MenuItem key={friend.username} value={friend.username}>
                    {friend.username}
                  </MenuItem>
                ))}
              </Select>

              {/* Share button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleShare}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg"
              >
                Chia sẻ
              </Button>
            </div>
          </div>
        )}
      </Box>

      <ToastContainer />
    </div>
  );
}

export default ShareFiles;
