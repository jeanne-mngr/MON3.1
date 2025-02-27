<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="saveContact">
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
                    <button type="submit" class="btn btn-dark btn-sm">Ajouter le contact</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';
import { useToast } from 'vue-toastification'

const toast = useToast();

const contact = ref({
    name:'',
    email:'',
    phone:'',
    designation:'',
});
const saveContact = async () => {
    if(!contact.value.name || !contact.value.email || !contact.value.phone || !contact.value.designation) {
        toast.error('Tous les champs sont requis'); 
    }
    try {
            const apiUrl = 'http://localhost:3000/api/contacts';
            const response = await axios.post(apiUrl, contact.value);
            if (response.status === 201) {
                toast.success('Le contact a bien été ajouté');
                contact.value.name = '';
                contact.value.email = '';
                contact.value.phone = '';
                contact.value.designation = '';
            }
        } catch(err) {
            console.log(err);
        } 

}
</script>