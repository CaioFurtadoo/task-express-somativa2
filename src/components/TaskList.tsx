import React, { useMemo } from 'react';
import { SectionList, StyleSheet, View, Text } from 'react-native';

import TaskItem from './TaskItem';

import { TaskItem as TaskType } from '../utils/handle-api';

import { useTaskStore } from '../store/useTaskStore';

interface TaskListProps {
  filter: 'all' | 'completed' | 'pending';
  onUpdate: (task: TaskType) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  filter,
  onUpdate,
}) => {
  const tasks = useTaskStore((state) => state.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'completed') return task.completed;

      if (filter === 'pending') return !task.completed;

      return true;
    });
  }, [tasks, filter]);

  const sections = useMemo(() => {
    const completedTasks = filteredTasks.filter(
      (task) => task.completed
    );

    const pendingTasks = filteredTasks.filter(
      (task) => !task.completed
    );

    return [
      {
        title: '✅ Concluídas',
        data: completedTasks,
      },
      {
        title: '📋 Pendentes',
        data: pendingTasks,
      },
    ];
  }, [filteredTasks]);

  return (
    <View style={styles.listContainer}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            updateMode={() => onUpdate(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 16,
  },

  listContent: {
    paddingBottom: 24,
  },

  sectionHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    padding: 12,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default TaskList;