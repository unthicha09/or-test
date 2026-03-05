<template>
    <div class="page-wrapper">
        <div class="card">

            <h2 class="page-title">Add Surgery Queue</h2>

            <!-- Patient Information -->
            <h3 class="section-title">Patient Information</h3>

            <div class="grid-4">
                <input type="text" placeholder="Full Name" v-model="form.fullName" />
                <input type="text" placeholder="HN Number" v-model="form.hn" />
                <input type="number" placeholder="Age" v-model="form.age" />

                <select v-model="form.gender">
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>

            <!-- Medical History -->
            <h3 class="section-title">Medical History</h3>

            <div class="grid-3">
                <input type="text" placeholder="Underlying Disease" v-model="form.disease" />
                <input type="text" placeholder="Drug Allergy" v-model="form.allergy" />

                <select v-model="form.bloodType">
                    <option value="">Select Blood Type</option>
                    <option>A</option>
                    <option>B</option>
                    <option>AB</option>
                    <option>O</option>
                </select>
            </div>

            <textarea rows="4" placeholder="Additional Notes" v-model="form.notes"></textarea>

            <!-- Surgery Detail -->
            <h3 class="section-title">Surgery Detail</h3>

            <div class="grid-5">
                <input type="text" placeholder="Doctor License (5 digits)" v-model="form.license" />
                <input type="text" placeholder="Doctor Name" v-model="form.doctor" />

                <select v-model="form.room">
                    <option value="">Select Operating Room</option>
                    <option>OR-1</option>
                    <option>OR-2</option>
                </select>

                <input type="date" v-model="form.date" />

                <select v-model="form.procedure">
                    <option value="">Select Proposed Procedure</option>
                    <option>Appendectomy</option>
                    <option>Cholecystectomy</option>
                </select>
            </div>

            <div class="btn-container">
                <button class="primary-btn" @click="handleSubmit">
                    Add Queue
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
    fullName: '',
    hn: '',
    age: '',
    gender: '',
    disease: '',
    allergy: '',
    bloodType: '',
    notes: '',
    license: '',
    doctor: '',
    room: '',
    date: '',
    procedure: ''
})

const handleSubmit = () => {
    console.log(form)
    alert('Queue Added Successfully')
}
</script>


<style scoped>
.page-wrapper {
    padding: 40px;
    display: flex;
    justify-content: center;
}

.card {
    width: 100%;
    max-width: 1500px;
    background: #f4f6fa;
    padding: 40px;
    border-radius: 20px;
}

.page-title {
    font-size: 24px;
    margin-bottom: 30px;
    color: #1f3a66;
}

.section-title {
    margin-top: 30px;
    margin-bottom: 15px;
    color: #1f3a66;
}

.grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.grid-5 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
}

input,
select,
textarea {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #d0d6e0;
    font-size: 14px;
    width: 100%;
}

textarea {
    margin-top: 20px;
    resize: none;
}

.btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
}

.primary-btn {
    background: #1f3a66;
    color: white;
    padding: 10px 24px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
}

.primary-btn:hover {
    background: #162c4d;
}

/* Responsive */
@media (max-width: 1200px) {
    .grid-5 {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 900px) {

    .grid-4,
    .grid-3,
    .grid-5 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {

    .grid-4,
    .grid-3,
    .grid-5 {
        grid-template-columns: 1fr;
    }

    .btn-container {
        justify-content: center;
    }
}
</style>