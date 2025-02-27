<template>
    <div class="container">
        <ClipLoader v-if="loading"/>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Num de tel</th>
                    <th>Poste</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-for="contact in contactList">
                <tr class="table-secondary">
                    <td>{{contact.name}}</td>
                    <td>{{contact.email}}</td>
                    <td>{{contact.phone}}</td>
                    <td>{{contact.designation}}</td>
                    <td>
                        <router-link :to="{name: 'EditContact', params: { id: contact._id}}" class="btn btn-primary btn-sm mr-4">Modifier</router-link>
                        <button @click="deleteContact(contact._id)" class="btn btn-danger btn-sm">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { ref, onMounted} from 'vue';
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
    import { useToast } from 'vue-toastification'

    const toast = useToast();
    const apiUrl = 'http://localhost:3000/api/contacts';

    const contactList = ref([]);
    const loading = ref(true);

    const getContacts = async () => {
        try {
            const response = await axios.get(apiUrl);
            contactList.value = response.data;
        } catch(err) {
            console.log(err);
        } finally {
            loading.value = false;
        }
    };

    const deleteContact = async (id) => {
        try {
            const url = `${apiUrl}/${id}`;
            if(confirm('Êtes-vous sûrs de vouloir supprimer ce contact ?')){
                const response = await axios.delete(url);
                if (response.status === 200) {
                    getContacts();
                    toast.success('Le contact a bien été supprimé');
                }
            };
        } catch(err) {
            console.log(err);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        getContacts();
    })
</script>