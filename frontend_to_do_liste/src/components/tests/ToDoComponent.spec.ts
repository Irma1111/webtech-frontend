import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Todo from '../components/ToDoComponent.vue';
import { nextTick } from 'vue';
import { ref } from 'vue';

describe('Todo', () => {
    it('renders the component', () => {
        const wrapper = mount(Todo);
        expect(wrapper.exists()).toBe(true);
    });

    it('adds a new todo', async () => {
        const wrapper = mount(Todo);

        // Setzen Sie den Wert des input-Elements
        const input = wrapper.find('input[type="text"]').element as HTMLInputElement; // Elementtyp explizit deklarieren
        input.value = 'Test Todo';
        await input.dispatchEvent(new Event('input'));

        // Simulieren Sie das Drücken der Enter-Taste
        await wrapper.find('input[type="text"]').trigger('keyup.enter');

        // Warten Sie auf eine asynchrone Aktualisierung der Komponente
        await nextTick();

        // Überprüfen, ob das neue Todo in der Liste erscheint
        expect(wrapper.text()).toContain('Test Todo');
    });

    it('edits a todo', async () => {
        // Mock-Daten für Todos erstellen
        const mockTodos = ref([
            { id: 1, description: 'Test Todo 1', isCompleted: false },
            { id: 2, description: 'Test Todo 2', isCompleted: false }
        ]);

        // Komponente mit Mock-Daten als Prop mounten
        const wrapper = mount(Todo, {
            global: {
                mocks: {
                    todos: mockTodos
                }
            }
        });

        // Simulieren Sie das Klicken auf den "Ändern"-Button des ersten Todo-Eintrags
        await wrapper.findAll('button').filter(button => button.text() === 'Ändern')[0].trigger('click');

        // Überprüfen Sie, ob das 'editingTodo' auf den richtigen Todo-Eintrag gesetzt wurde
        expect(wrapper.vm.editingTodo).toEqual(mockTodos.value[0]);

        // Überprüfen Sie, ob das 'input' den richtigen Wert enthält
        const input = wrapper.find('input[type="text"]').element as HTMLInputElement; // Elementtyp explizit deklarieren
        expect(input.value).toBe('Test Todo 1');
    });
});
