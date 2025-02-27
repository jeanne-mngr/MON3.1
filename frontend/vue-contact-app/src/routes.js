import { createRouter, createWebHistory} from 'vue-router'
import AddContact from './components/AddContact.vue'
import EditContact from './components/EditContact.vue'
import ContactList from './components/ContactList.vue'

const routes = [
    {
        name: 'ContactList',
        path: '/',
        component: ContactList,
    },
    {
        name: 'AddContact',
        path: '/create-contact',
        component: AddContact,
    },
    {
        name: 'EditContact',
        path: '/contact/:id?',
        component: EditContact,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;