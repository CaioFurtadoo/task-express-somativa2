import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useTaskStore } from '../../../src/store/useTaskStore';

export default function TaskDetails() {
  const { id } = useLocalSearchParams();

  const task = useTaskStore((state) =>
    state.tasks.find((t) => t._id === id)
  );

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Tarefa não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.text}</Text>

      <Text style={styles.info}>
        Status: {task.completed ? 'Concluída' : 'Pendente'}
      </Text>

      {task.dueDate && (
        <Text style={styles.info}>
          Data limite: {new Date(task.dueDate).toLocaleDateString()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});