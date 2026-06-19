import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

interface TaskProps {
  text: string;
  updateMode: () => void;
  deleteTask: () => void;
}

const Task: React.FC<TaskProps> = ({ text, updateMode, deleteTask }) => {
  return (
      <View
          className="
              bg-white
              rounded-xl
              shadow
              p-4
              mt-4
              flex-row
              justify-between
              items-center
          "
      >      
      <Text
      className="text-black text-base flex-1"
      >
      {text}
      </Text>
      <View className="flex-row gap-4">
        <TouchableOpacity onPress={updateMode}>
            <Feather
                name="edit"
                size={20}
                color="black"
            />
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteTask}>
            <AntDesign
                name="delete"
                size={20}
                color="red"
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};