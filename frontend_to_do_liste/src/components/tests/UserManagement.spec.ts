import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UserManagement from '../components/UserManagement.vue';
import axios from 'axios';
import { nextTick } from 'vue';

describe('UserManagementComponentTests', () => {
    it('renders correctly', () => {
        const wrapper = mount(UserManagement);
        expect(wrapper.text()).toContain('User Management');
    });

    it('adds a new user', async () => {
        const wrapper = mount(UserManagement);

        // Setzen Sie den Wert der Input-Elemente für Name und Email
        const nameInput = wrapper.find('input[placeholder="Name"]');
        const emailInput = wrapper.find('input[placeholder="Email"]');

        await nameInput.setValue('Test User');
        await emailInput.setValue('test@example.com');

        // Simulieren Sie das Absenden des Formulars
        await wrapper.find('form').trigger('submit.prevent');

        // Warten Sie auf eine asynchrone Aktualisierung der Komponente
        await wrapper.vm.$nextTick();

        // Überprüfen, ob der neue Benutzer in der Liste erscheint
        expect(wrapper.text()).toContain('Test User (test@example.com)');
    });

    it('edits a user', async () => {
        const wrapper = mount(UserManagement);

        // Klicken Sie auf den "Ändern"-Button des ersten Benutzers
        await wrapper.findAll('button.edit-button').filter(button => button.text() === 'Ändern')[0].trigger('click');

        // Überprüfen Sie, ob das Bearbeiten-Modus aktiviert ist
        expect(wrapper.vm.editingUser).toBeTruthy();

        // Bearbeiten Sie den Namen des Benutzers
        const nameInput = wrapper.find('input[placeholder="Name"]');
        await nameInput.setValue('Edited User');

        // Simulieren Sie das Absenden des Formulars
        await wrapper.find('form').trigger('submit.prevent');

        // Warten Sie auf eine asynchrone Aktualisierung der Komponente
        await wrapper.vm.$nextTick();

        // Überprüfen Sie, ob der bearbeitete Benutzer in der Liste erscheint
        expect(wrapper.text()).toContain('Edited User (test@example.com)');
    });

    it('deletes a user', async () => {
        const wrapper = mount(UserManagement);

        // Klicken Sie auf den "Löschen"-Button des ersten Benutzers
        await wrapper.findAll('button.delete-button').filter(button => button.text() === 'Löschen')[0].trigger('click');

        // Warten Sie auf eine asynchrone Aktualisierung der Komponente
        await wrapper.vm.$nextTick();

        // Überprüfen Sie, ob der Benutzer aus der Liste entfernt wurde
        expect(wrapper.text()).not.toContain('Edited User (test@example.com)');
    });
});
