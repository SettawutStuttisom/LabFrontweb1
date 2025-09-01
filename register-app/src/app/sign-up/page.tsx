"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Link from "next/link";

const provinces = [
  "กรุงเทพมหานคร","กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร",
  "ขอนแก่น","จันทบุรี","ฉะเชิงเทรา","ชัยนาท","ชัยภูมิ","ชุมพร",
  "ชลบุรี","เชียงใหม่","เชียงราย","ตรัง","ตราด","ตาก","นครนายก",
  "นครปฐม","นครพนม","นครราชสีมา","นครศรีธรรมราช","นครสวรรค์",
  "นราธิวาส","น่าน","บึงกาฬ","บุรีรัมย์","ปทุมธานี","ประจวบคีรีขันธ์",
  "ปราจีนบุรี","ปัตตานี","พระนครศรีอยุธยา","พะเยา","พังงา","พิจิตร",
  "พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","ภูเก็ต","มหาสารคาม",
  "มุกดาหาร","แม่ฮ่องสอน","ยะลา","ยโสธร","ร้อยเอ็ด","ระนอง",
  "ระยอง","ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ",
  "สกลนคร","สงขลา","สตูล","สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร",
  "สระแก้ว","สระบุรี","สิงห์บุรี","สุโขทัย","สุพรรณบุรี","สุราษฎร์ธานี",
  "สุรินทร์","สวรรคโลก","หนองคาย","หนองบัวลำภู","อำนาจเจริญ","อุดรธานี",
  "อุตรดิตถ์","อุทัยธานี","อุบลราชธานี","อ่างทอง","เชียงของ"
];

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    address: "",
    province: "",
    gender: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");

  // ตรวจสอบฟอร์ม
  const validate = () => {
    const newErrors: any = {};

    // Email ตรวจสอบ @
    if (!form.email.includes("@")) newErrors.email = "Email ต้องมี @";

    // Password อย่างน้อย 8 ตัว มีตัวเลข + ตัวอักษร
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password)) {
      newErrors.password =
        "รหัสผ่านต้องมีอย่างน้อย 8 ตัว, ตัวอักษรและตัวเลข";
    }

    // Confirm Password
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";

    // ชื่อ และ นามสกุล
    if (!form.firstName) newErrors.firstName = "กรุณากรอกชื่อ";
    if (!form.lastName) newErrors.lastName = "กรุณากรอกนามสกุล";

    // วัน/เดือน/ปี เกิด
    const day = parseInt(form.birthDay);
    const month = parseInt(form.birthMonth);
    const year = parseInt(form.birthYear);
    if (!day || day < 1 || day > 31) newErrors.birthDay = "วันไม่ถูกต้อง";
    if (!month || month < 1 || month > 12) newErrors.birthMonth = "เดือนไม่ถูกต้อง";
    if (!year || year < 1900 || year > new Date().getFullYear())
      newErrors.birthYear = "ปีไม่ถูกต้อง";

    // ที่อยู่
    if (!form.address) newErrors.address = "กรุณากรอกที่อยู่";

    // จังหวัด
    if (!provinces.includes(form.province))
      newErrors.province = "กรุณาเลือกจังหวัดที่ถูกต้อง";

    // เพศ
    if (!["ชาย", "หญิง", "ไม่ระบุ"].includes(form.gender))
      newErrors.gender = "กรุณาเลือกเพศ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      console.log("signup form", form);
      setSuccessMessage("ลงทะเบียนสำเร็จ");
      setTimeout(() => router.push("/signin"), 2000);
    } else {
      setSuccessMessage("");
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", my: 4 }}>
      <CardContent>
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
          helperText={errors.email}
          error={!!errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
          helperText={errors.password}
          error={!!errors.password}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.confirmPassword}
          onChange={handleChange}
          helperText={errors.confirmPassword}
          error={!!errors.confirmPassword}
        />
        <TextField
          label="ชื่อ"
          name="firstName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.firstName}
          onChange={handleChange}
          helperText={errors.firstName}
          error={!!errors.firstName}
        />
        <TextField
          label="นามสกุล"
          name="lastName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.lastName}
          onChange={handleChange}
          helperText={errors.lastName}
          error={!!errors.lastName}
        />
        <Typography mt={2}>วัน/เดือน/ปี เกิด</Typography>
        <TextField
          label="วัน"
          name="birthDay"
          type="number"
          sx={{ width: "30%", mr: 1 }}
          value={form.birthDay}
          onChange={handleChange}
          helperText={errors.birthDay}
          error={!!errors.birthDay}
        />
        <TextField
          label="เดือน"
          name="birthMonth"
          type="number"
          sx={{ width: "30%", mr: 1 }}
          value={form.birthMonth}
          onChange={handleChange}
          helperText={errors.birthMonth}
          error={!!errors.birthMonth}
        />
        <TextField
          label="ปี"
          name="birthYear"
          type="number"
          sx={{ width: "30%" }}
          value={form.birthYear}
          onChange={handleChange}
          helperText={errors.birthYear}
          error={!!errors.birthYear}
        />
        <TextField
          label="ที่อยู่"
          name="address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.address}
          onChange={handleChange}
          helperText={errors.address}
          error={!!errors.address}
        />
        <FormControl fullWidth margin="normal" error={!!errors.province}>
          <InputLabel>จังหวัด</InputLabel>
          <Select
            name="province"
            value={form.province}
            onChange={handleChange}
            label="จังหวัด"
          >
            {provinces.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="error">
            {errors.province}
          </Typography>
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.gender}>
          <InputLabel>เพศ</InputLabel>
          <Select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            label="เพศ"
          >
            <MenuItem value="ชาย">ชาย</MenuItem>
            <MenuItem value="หญิง">หญิง</MenuItem>
            <MenuItem value="ไม่ระบุ">ไม่ระบุ</MenuItem>
          </Select>
          <Typography variant="caption" color="error">
            {errors.gender}
          </Typography>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignUp}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>

        {successMessage && (
          <Typography variant="body1" color="success.main" align="center" mt={2}>
            {successMessage}
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary" align="center" mt={2}>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Sign in
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
