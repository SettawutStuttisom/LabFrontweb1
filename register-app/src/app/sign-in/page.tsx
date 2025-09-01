"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function SigninPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(""); // Email หรือ Username
  const [Password, setPassword] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // ตรวจสอบความยาวรหัสผ่าน
    if (Password.length < 4 && Password.length > 0) {
      setIsPasswordValid(false);
      setPasswordError("Password must be at least 4 characters long");
    } else {
      setIsPasswordValid(true);
      setPasswordError("");
    }
  }, [Password]);

  const handleSignIn = () => {
    if (!identifier) {
      setErrorMessage("กรุณากรอก Email หรือ Username");
      return;
    }

    if (!isPasswordValid || !Password) {
      setErrorMessage("กรุณากรอกรหัสผ่านให้ถูกต้อง");
      return;
    }

    setErrorMessage("");

    // ตัวอย่าง: login ตรวจสอบกับ API หรือ localStorage
    console.log("Signin form:", { identifier, Password });

    // TODO: เรียก API สำหรับ login
    // หากสำเร็จ:
    // router.push("/dashboard"); // ตัวอย่าง redirect หลัง login
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", my: 4 }}>
      <CardContent>
        <TextField
          label="Email or Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={passwordError}
          error={!isPasswordValid}
        />
        {errorMessage && (
          <Typography variant="body2" color="error" align="center" mt={1}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignIn}
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
        <Typography variant="body2" color="textSecondary" align="center" mt={2}>
          Don't have an account?{" "}
          <Link href="/sign-up" style={{ color: "blue", textDecoration: "underline" }}>
            Sign up
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
