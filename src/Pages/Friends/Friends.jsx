import React, { useState } from "react";
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

function Friends() {
  // States quản lý các tab, email, lời mời và thông báo
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [pendingRequests, setPendingRequests] = useState([
    "example1@gmail.com",
    "example2@gmail.com",
  ]);

  const handleSendRequest = () => {
    if (email.trim() === "") {
      setSnackbarMessage("Vui lòng nhập email!");
      setOpenSnackbar(true);
      return;
    }
    setSnackbarMessage(`Đã gửi lời mời kết bạn đến ${email}`);
    setOpenSnackbar(true);
    setEmail("");
  };

  const handleAcceptRequest = (email) => {
    setPendingRequests(pendingRequests.filter((request) => request !== email));
    setSnackbarMessage(`Bạn đã kết bạn với ${email}`);
    setOpenSnackbar(true);
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
                label="Nhập email người nhận"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText="Vui lòng nhập email để gửi lời mời kết bạn"
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
                  {pendingRequests.map((email) => (
                    <li
                      key={email}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{email}</span>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAcceptRequest(email)}
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
