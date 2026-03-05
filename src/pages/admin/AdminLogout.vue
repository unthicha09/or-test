<template>
    <div class="dashboard-wrapper">
        <header class="top-bar">
            <div class="user-info">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 14c4.418 0 8 1.79 8 4v2H4v-2c0-2.21 3.582-4 8-4z" />
                    <circle cx="12" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="username">Admin 1</span>
            </div>

            <button class="logout-icon-btn" @click="showModal = true">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </header>

        <main class="main-content">
        </main>

        <div v-if="showModal" class="modal-overlay">
            <div class="modal-card">
                <p class="modal-text">Are you sure you want to log out?</p>
                <div class="modal-actions">
                    <button class="btn btn-cancel" @click="showModal = false">Cancel</button>
                    <button class="btn btn-confirm" @click="handleConfirmLogout">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ตัวแปรสำหรับควบคุมการแสดงผลของป๊อปอัป (เริ่มต้นคือซ่อนไว้)
const showModal = ref(false)

// ฟังก์ชันเมื่อกดปุ่ม Confirm
const handleConfirmLogout = () => {
    showModal.value = false
    // นำผู้ใช้กลับไปที่หน้า login
    router.push('/login')
}
</script>

<style scoped>
/* โครงสร้างหลัก */
.dashboard-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
}

/* แถบเมนูด้านบน */
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #6c91d8;
    /* สีฟ้าตามแบบ */
    color: white;
    padding: 16px 20px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.username {
    font-size: 18px;
    font-weight: 500;
}

.icon {
    width: 28px;
    height: 28px;
}

.logout-icon-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
}

/* พื้นที่เนื้อหา */
.main-content {
    flex-grow: 1;
    background-color: #f4f7f6;
}

/* ป๊อปอัป (Modal) */
.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(153, 153, 153, 0.85);
    /* พื้นหลังสีเทาโปร่งแสง */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-card {
    background-color: white;
    padding: 30px;
    border-radius: 16px;
    width: 90%;
    max-width: 320px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-text {
    font-size: 16px;
    color: #333;
    margin-bottom: 24px;
    margin-top: 0;
}

.modal-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
}

.btn {
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    color: white;
    transition: opacity 0.2s;
}

.btn:hover {
    opacity: 0.9;
}

.btn-cancel {
    background-color: #6c91d8;
    /* สีฟ้า */
}

.btn-confirm {
    background-color: #4eb09b;
    /* สีเขียวอมฟ้า */
}
</style>