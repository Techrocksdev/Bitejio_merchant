// File: src/components/OTPTimer.jsx
import React, { useState, useEffect } from "react";

const OTPTimer = ({
  seconds = 30,
  minutes = 0,
  onResendClick,
  resendButtonText = "Resend OTP",
  text = "Time Left",
  style = {},
  buttonStyle = {},
}) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleResend = async () => {
    if (onResendClick) {
      const result = await onResendClick();
      if (result !== false) {
        setTimeLeft(minutes * 60 + seconds);
        setIsActive(true);
      }
    }
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={style}>
      {isActive ? (
        <span>
          {text} {formatTime()}
        </span>
      ) : (
        <button
          onClick={handleResend}
          style={{
            background: "none",
            border: "none",
            color: "#e46a15",
            fontWeight: 600,
            fontSize: "16px",
            cursor: "pointer",
            ...buttonStyle,
          }}
        >
          {resendButtonText}
        </button>
      )}
    </div>
  );
};

export default OTPTimer;
