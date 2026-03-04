<template>
    <div class="admin-container">

        <!-- Header -->
        <div class="admin-info" @click="toggleMenu">
            Admin
            <div v-if="showMenu" class="admin-dropdown">
                <div class="dropdown-item" @click="logout">
                    Logout
                </div>
            </div>
        </div>

        <!-- ===== STATUS BOARD ===== -->
        <section class="section">
            <h3>Live Operation Status</h3>

            <div class="status-grid">
                <div class="or-card" v-for="room in operationRooms" :key="room.id">
                    <h4>{{ room.name }}</h4>
                    <p><strong>Procedure:</strong> {{ room.procedure }}</p>
                    <p><strong>Surgeon:</strong> {{ room.surgeon }}</p>
                    <p><strong>Patient:</strong> {{ room.patient }}</p>
                    <p>
                        <strong>Status:</strong>
                        <span :class="['badge', room.status.toLowerCase()]">
                            {{ room.status }}
                        </span>
                    </p>
                </div>
            </div>
        </section>

        <!-- ===== STAFF TABLE ===== -->
        <section class="section">
            <h3>Medical Staff Overview</h3>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>License</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(staff, index) in staffList" :key="staff.id">

                        <td class="date-cell">
                            <div class="day">{{ getDayName(staff.date) }}</div>
                            <div class="date">{{ getFormattedDate(staff.date) }}</div>
                        </td>

                        <td>{{ staff.license }}</td>

                        <td>{{ staff.name }}</td>

                        <td>
                            <span :class="['badge', staff.status?.toLowerCase()]">
                                {{ staff.status }}
                            </span>
                        </td>

                        <td>
                            <button @click="removeStaff(index)">🗑</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </section>
        <!-- ===== TODAY SCHEDULE ===== -->
        <section class="section">
            <h3>Today's Schedule</h3>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>License</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tr v-for="(item, index) in schedule" :key="index">
                    <td>{{ item.date }}</td>
                    <td>{{ item.patient }}</td>
                    <td>{{ item.procedure }}</td>
                    <td>{{ item.surgeon }}</td>
                    <td>{{ item.room }}</td>
                </tr>
            </table>
        </section>

        <!-- ===== ADD QUEUE FORM ===== -->
        <section class="section form-section">
            <h3>Add Surgery Queue</h3>

            <form @submit.prevent="addQueue">

                <!-- Patient Information -->
                <h4 class="sub-title">Patient Information</h4>
                <div class="form-grid">
                    <input v-model="newQueue.patient" placeholder="Full Name" required />
                    <input v-model="newQueue.hn" placeholder="HN Number" required />
                    <input type="number" v-model="newQueue.age" placeholder="Age" min="0" />

                    <!-- Gender Dropdown -->
                    <select v-model="newQueue.gender" class="select" required>
                        <option disabled value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                <!-- Medical History -->
                <h4 class="sub-title">Medical History</h4>
                <div class="form-grid">
                    <input v-model="newQueue.disease" placeholder="Underlying Disease" />
                    <input v-model="newQueue.allergy" placeholder="Drug Allergy" />

                    <!-- Blood Type Dropdown -->
                    <select v-model="newQueue.bloodType" class="select">
                        <option disabled value="">Select Blood Type</option>
                        <option>A</option>
                        <option>B</option>
                        <option>O</option>
                        <option>AB</option>
                        <option>Other</option>
                    </select>

                    <!-- Show only when Other selected -->
                    <input v-if="newQueue.bloodType === 'Other'" v-model="newQueue.bloodTypeOther"
                        placeholder="Specify Blood Type" />
                </div>

                <textarea v-model="newQueue.note" placeholder="Additional Notes" class="textarea"></textarea>

                <!-- Surgery Detail -->
                <h4 class="sub-title">Surgery Detail</h4>
                <div class="form-grid">

                    <!-- Doctor License -->
                    <input v-model="newQueue.license" placeholder="Doctor License (5 digits)" maxlength="5"
                        @input="newQueue.license = newQueue.license.replace(/[^0-9]/g, '')" required />

                    <!-- Doctor Name -->
                    <input v-model="newQueue.surgeon" placeholder="Doctor Name" required />

                    <!-- Operating Room -->
                    <!-- Operating Room -->
                    <select v-model="newQueue.room" class="select" required>
                        <option disabled value="">Select Operating Room</option>
                        <option>OR-1</option>
                        <option>OR-2</option>
                        <option>OR-3</option>

                    </select>

                    <!-- Surgery Date (เพิ่มอันนี้) -->
                    <input type="date" v-model="newQueue.surgeryDate" required />

                    <!-- Proposed Procedure Dropdown -->
                    <select v-model="newQueue.procedure" class="select" required>
                        <option disabled value="">Select Proposed Procedure</option>
                        <option>LC (120 min)</option>
                        <option>MRM (90 min)</option>
                        <option>Thyroidectomy (90 min)</option>
                        <option>Herniorrhaphy (40 min)</option>
                        <option>LAR (180 min)</option>
                    </select>

                </div>


                <div class="form-action">
                    <button type="submit" class="btn-primary">
                        Add Queue
                    </button>
                </div>
            </form>
        </section>

    </div>
</template>

















<script setup>
import { ref } from 'vue'

/* ===== Operation Rooms ===== */
const operationRooms = ref([
    {
        id: 1,
        name: 'OR 1',
        procedure: 'Appendectomy',
        surgeon: 'Dr. Smith',
        patient: 'John Doe',
        status: 'UPCOMING'
    },
    {
        id: 2,
        name: 'OR 2',
        procedure: 'Cardiac Bypass',
        surgeon: 'Dr. Brown',
        patient: 'Michael Lee',
        status: 'UPCOMING'
    },
    {
        id: 3,
        name: 'OR 3',
        procedure: '-',
        surgeon: '-',
        patient: '-',
        status: 'SUCCEED'
    }
])
const getDayName = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'long' })
}

const getFormattedDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}
/* ===== Staff ===== */
const staffList = ref([
    {
        id: 1,
        license: '12345',
        name: 'Dr. Smith',
        status: 'Upcoming',
        date: '2024-03-10'
    },
    {
        id: 2,
        license: '67890',
        name: 'Dr. Brown',
        status: 'Upcoming',
        date: '2024-03-10'
    }
])

const removeStaff = (index) => {
    staffList.value.splice(index, 1)
}

/* ===== Schedule (Today's Schedule) ===== */
const schedule = ref([])

/* ===== New Queue Form ===== */
const newQueue = ref({
    patient: '',
    hn: '',
    age: '',
    gender: '',
    disease: '',
    allergy: '',
    bloodType: '',
    bloodTypeOther: '',
    note: '',
    license: '',
    surgeon: '',
    room: '',
    procedure: '',
    surgeryDate: '',
    room: ''
})

/* ===== Add Queue Function ===== */
const addQueue = () => {

    // เพิ่มเข้า Schedule
    schedule.value.push({
        date: newQueue.value.surgeryDate,
        patient: newQueue.value.patient,
        procedure: newQueue.value.procedure,
        surgeon: newQueue.value.surgeon,
        room: newQueue.value.room
    })

    // เพิ่มเข้า Staff Overview
    staffList.value.push({
        id: Date.now(),
        license: newQueue.value.license,
        name: newQueue.value.surgeon,
        status: 'Upcoming', // 👈 ต้องมี
        date: newQueue.value.surgeryDate
    })

    // reset form
    newQueue.value = {
        patient: '',
        hn: '',
        age: '',
        gender: '',
        disease: '',
        allergy: '',
        bloodType: '',
        bloodTypeOther: '',
        note: '',
        license: '',
        surgeon: '',
        room: '',
        procedure: '',
        surgeryDate: ''
    }
}

/* ===== Admin Dropdown ===== */
const showMenu = ref(false)

const toggleMenu = () => {
    showMenu.value = !showMenu.value
}

const logout = () => {
    alert('Logged out successfully')
}
</script>




















<style scoped>
/* ===== Layout ===== */
.admin-container {
    padding: 40px;
    background: #f3f6fb;
    min-height: 100vh;
    font-family: 'Segoe UI', sans-serif;
    color: #1f2937;
}

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.topbar h2 {
    font-weight: 600;
    color: #0f172a;
}

/* ===== Section ===== */
.section {
    margin-bottom: 50px;
}

.section h3 {
    margin-bottom: 20px;
    font-weight: 600;
    color: #0b2c6b;
}

/* ===== OR Cards ===== */
.status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
}

.or-card {
    background: white;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
    transition: 0.2s ease;
}

.or-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(15, 23, 42, 0.08);
}

.or-card h4 {
    margin-bottom: 12px;
    color: #0b2c6b;
}

/* ===== Badge ===== */
.badge {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    color: white;
}

.upcoming {
    background: #f59e0b;
    /* ส้ม */
}

.succeed {
    background: #16a34a;
    /* เขียว */
}

/* ===== Table ===== */
table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
}

thead {
    background: #0b2c6b;
    color: white;
}

th {
    padding: 14px 18px;
    text-align: left;
    font-weight: 500;
    font-size: 14px;
}

td {
    padding: 14px 18px;
    font-size: 14px;
}

tbody tr:nth-child(even) {
    background: #f8fafc;
}

tbody tr:hover {
    background: #e2e8f0;
    transition: 0.2s ease;
}

/* ===== Form ===== */
.form-section {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}

.form-grid input {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    transition: 0.2s;
}

.form-grid input:focus {
    outline: none;
    border-color: #0b2c6b;
    box-shadow: 0 0 0 2px rgba(11, 44, 107, 0.15);
}

.form-action {
    margin-top: 20px;
    text-align: right;
}

.btn-primary {
    background-color: #1e3a8a;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: 0.2s ease;
}

.btn-primary:hover {
    background-color: #1e40af;
    transform: translateY(-2px);
}

.btn-primary {
    background: #0b2c6b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s ease;
}

.btn-primary:hover {
    background: #0f3c94;
}


.sub-title {
    margin: 25px 0 10px;
    font-weight: 600;
    color: #0b2c6b;
}

.textarea {
    width: 100%;
    min-height: 90px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    margin-top: 10px;
    resize: vertical;
}

.select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    margin-top: 10px;
    width: 250px;
}

.admin-info {
    position: relative;
    cursor: pointer;
    font-weight: 500;
    color: #0b2c6b;
}

.admin-dropdown {
    position: absolute;
    top: 30px;
    right: 0;
    background: white;
    width: 150px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 100;
}

.dropdown-item {
    padding: 12px;
    font-size: 14px;
    transition: 0.2s;
}

.dropdown-item:hover {
    background: #f3f6fb;
}

.delete-cell {
    text-align: center;
}

.delete-btn {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 18px;
}

.delete-btn:hover {
    color: red;
    transform: scale(1.2);
}

.date-cell .day {
    font-weight: 600;
    font-size: 14px;
    color: #1e3a8a;
}

.date-cell .date {
    font-size: 12px;
    color: #64748b;
}
</style>