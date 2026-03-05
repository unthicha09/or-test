<template>
    <div class="login-wrapper">
        <div class="login-card">

            <div class="logo-section">
                <img src="https://via.placeholder.com/100x100.png?text=Logo" alt="Hospital Logo" class="logo-img" />
                <h1 class="logo-text">Hospital</h1>
            </div>

            <form @submit.prevent="handleLogin" class="login-form">
                <input type="text" v-model="name" placeholder="Name" class="custom-input" />
                <input type="password" v-model="password" placeholder="Password" class="custom-input" />
                <button type="submit" class="login-button">Log in</button>
            </form>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const password = ref('')

const handleLogin = () => {
    // ใส่โค้ดสำหรับส่งข้อมูลไปยัง API เพื่อตรวจสอบการล็อกอินที่นี่
    console.log('Attempting log in with:', name.value, password.value)
}
</script>

<style scoped>
/* จัดให้อยู่กึ่งกลางหน้าจอ */
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #ffffff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 340px;
    padding: 20px;
}

/* สไตล์ของโลโก้ */
.logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
}

.logo-img {
    width: 90px;
    height: auto;
    margin-bottom: 5px;
}

.logo-text {
    color: #0088cc;
    /* สีฟ้าให้ใกล้เคียงกับคำว่า Hospital */
    font-size: 22px;
    font-weight: 700;
    margin: 0;
}

/* สไตล์ของฟอร์ม */
.login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    /* ระยะห่างระหว่างช่องกรอกข้อมูล */
}

/* สไตล์ของช่อง Input (สีเขียวอ่อน) */
.custom-input {
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #b3e6b3;
    /* กรอบสีเขียวอ่อน */
    background-color: #eafbea;
    /* พื้นหลังสีเขียวพาสเทล */
    color: #4a7560;
    /* สีตัวอักษรด้านใน */
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s ease-in-out;
}

.custom-input::placeholder {
    color: #5c8d76;
}

.custom-input:focus {
    border-color: #7ab591;
}

/* สไตล์ของปุ่ม Log in */
.login-button {
    width: 100%;
    padding: 16px;
    margin-top: 20px;
    border-radius: 12px;
    border: none;
    background-color: #7296db;
    /* สีฟ้าอมม่วงแบบในรูป */
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.login-button:hover {
    background-color: #5b7dc2;
}
</style>