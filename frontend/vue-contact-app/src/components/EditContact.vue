<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateContact">
                    <div class="form-group">
                        <input type="text" v-model="contact.name" class="form-control" placeholder="Entrer le nom">
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" v-model="contact.email" class="form-control" placeholder="Entrer le mail">
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" v-model="contact.phone" class="form-control" placeholder="Entrer le numéro de téléphone">
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" v-model="contact.designation" class="form-control" placeholder="Entrer le métier">
                    </div>
                    <br>
                    <button type="submit" class="btn btn-dark btn-sm">Modifier le contact</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const contact = ref({
    name:'',
    email:'',
    phone:'',
    designation:'',
});


const getContactById = async () => {
    try {
        const apiUrl = `http://localhost:3000/api/contacts/${route.params.id}`;
        const response = await axios.get(apiUrl);
        contact.value = response.data;
    } catch(err) {
            console.log(err);
        } 
}

const updateContact = async () => {
    if(!contact.value.name || !contact.value.email || !contact.value.phone || !contact.value.designation) {
        toast.error('Tous les champs sont requis'); 
    }
    try {
            const apiUrl = `http://localhost:3000/api/contacts/${route.params.id}`;
            const response = await axios.put(apiUrl, contact.value);
            
            if (response.status === 200) {
                toast.success('Le contact a bien été modifié');
                router.push({name: 'ContactList'})
            }
        } catch(err) {
            console.log(err);
        } 

}

onMounted(() => {
    getContactById();
})
</script>