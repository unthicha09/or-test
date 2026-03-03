<template>
  <div class="page">
    <div class="card">
      <img src="../assets/logo.png" class="logo" />

      <h2 class="title">Hospital</h2>

      <input v-model="license" type="text" inputmode="numeric" maxlength="5" placeholder="License" class="input"
        @input="handleLicenseInput" />

      <input v-model="password" type="password" placeholder="Password" class="input" />

      <div class="links">
        <span>Admin mode</span>
        <span class="divider">|</span>

        <span class="link" @click="goForgot">
          Forgot password
        </span>

        <span class="divider">|</span>

        <span class="link" @click="goSignup">
          Sign up
        </span>
      </div>

      <button class="btn" @click="login">Log in</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const license = ref("");
const password = ref("");

// ถ้า login แล้ว ไม่ต้องอยู่หน้า login
onMounted(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    router.push("/home");
  }
});

// ฟังก์ชันนำทาง
const goForgot = () => router.push("/forgot-password");
const goSignup = () => router.push("/signup");

// บังคับให้เป็นตัวเลข และไม่เกิน 5 หลัก
const handleLicenseInput = () => {
  license.value = license.value
    .replace(/\D/g, "")
    .slice(0, 5);
};

// 🔐 Login แบบจำลอง (ยังไม่ใช้ฐานข้อมูล)
const login = () => {
  if (license.value.length !== 5) {
    alert("License ต้องเป็นตัวเลข 5 หลัก");
    return;
  }

  if (!password.value) {
    alert("กรุณากรอก Password");
    return;
  }

  // จำลองว่า login สำเร็จ
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("user_license", license.value);

  alert("เข้าสู่ระบบสำเร็จ!");
  router.push("/home");
};
</script>




<style scoped>
* {
  box-sizing: border-box;
}

.page {
  height: 100dvh;
  width: 100%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding-top: 100px;
}

.card {
  width: 100%;
  max-width: 390px;
  padding: 24px;
  text-align: center;

  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.logo {
  width: 90px;
  margin-bottom: 10px;
}

.title {
  color: #001F5B;
  margin-bottom: 28px;
  font-weight: 700;
}

/* กล่องกรอกข้อมูลให้เหมือนหน้า Sign up */
.input {
  width: 100%;
  height: 50px;
  padding: 0 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #ffffff;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;
}

.input:focus {
  border: 1.5px solid #001F5B;
  box-shadow: 0 0 8px rgba(0, 31, 91, 0.1);
}

/* Links */
.links {
  font-size: 13px;
  color: #001F5B;
  margin-bottom: 24px;
}

.link {
  color: #001F5B;
  cursor: pointer;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.divider {
  margin: 0 8px;
  color: #bbb;
}

/* ปุ่ม */
.btn {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #001F5B;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  display: block;
  margin: 0 auto;
}

.btn:hover {
  background: #1A3A7C;
}
</style>
