import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  Snackbar,
  Alert,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import axios from "axios";

function Friends() {
  const [tabIndex, setTabIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  // Lấy danh sách bạn bè khi component mount
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Dùng token từ localStorage
          },
        });
        setFriends(response.data.friends || []); // Đảm bảo dữ liệu friends là một mảng
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  // Lấy danh sách lời mời kết bạn
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/friend/requests",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPendingRequests(response.data.requests || []); // Đảm bảo dữ liệu requests là một mảng
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };

    fetchPendingRequests();
  }, []);

  // Gửi lời mời kết bạn
  const handleSendRequest = async () => {
    if (username.trim() === "") {
      setSnackbarMessage("Vui lòng nhập username!");
      setOpenSnackbar(true);
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/friend/request",
        { to_user: username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSnackbarMessage(`Đã gửi lời mời kết bạn đến ${username}`);
      setOpenSnackbar(true);
      setUsername("");
    } catch (error) {
      setSnackbarMessage("Gửi lời mời thất bại!");
      setOpenSnackbar(true);
      console.error("Error sending friend request:", error);
    }
  };

  // Chấp nhận lời mời kết bạn
  const handleAcceptRequest = async (fromUser) => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/friend/accept",
        { from_user: fromUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSnackbarMessage(`Bạn đã kết bạn với ${fromUser}`);
      setOpenSnackbar(true);
      setPendingRequests((prev) =>
        prev.filter((request) => request !== fromUser)
      );
    } catch (error) {
      setSnackbarMessage("Chấp nhận lời mời thất bại!");
      setOpenSnackbar(true);
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Kết bạn</h2>

      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          centered
          className="text-white"
        >
          <Tab label="Gửi lời mời" className="text-white" />
          <Tab label="Chấp nhận lời mời" className="text-white" />
        </Tabs>

        {tabIndex === 0 && (
          <div className="mt-6">
            <Paper className="p-4 bg-gray-800 text-white">
              <TextField
                label="Nhập username người nhận"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                helperText="Vui lòng nhập username để gửi lời mời kết bạn"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendRequest}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg"
              >
                Gửi lời mời
              </Button>
            </Paper>
          </div>
        )}

        {tabIndex === 1 && (
          <div className="mt-6">
            <Paper className="p-4 bg-gray-800 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Danh sách lời mời kết bạn
              </h3>
              {pendingRequests.length === 0 ? (
                <p>Hiện tại không có lời mời nào</p>
              ) : (
                <ul>
                  {pendingRequests.map((username) => (
                    <li
                      key={username}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{username}</span>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAcceptRequest(username)}
                        className="ml-4"
                      >
                        Chấp nhận
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Paper>
          </div>
        )}

        <div className="mt-6">
          <Paper className="p-4 bg-gray-800 text-white">
            <h3 className="text-lg font-semibold mb-4">Danh sách bạn bè</h3>
            {friends.length === 0 ? (
              <p>Hiện tại bạn chưa có bạn bè</p>
            ) : (
              <ul>
                {friends.map((friend) => (
                  <li key={friend} className="mb-2">
                    {friend}
                  </li>
                ))}
              </ul>
            )}
          </Paper>
        </div>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Friends;
