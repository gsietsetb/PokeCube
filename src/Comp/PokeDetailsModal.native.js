import C, { apply } from 'consistencss';
import React from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { pokeStore } from '../App';
import { fonts } from '../style/gStyles';
import { PokemonDetails } from './PokeSummary';

export const PokeDetailsModal = ({
  visibe = false,
  closeModal,
  pokemon = pokeStore.currentPokemon,
}) => (
  <Modal
    animationType="slide"
    onDismiss={closeModal}
    presentationStyle={'pageSheet'}
    transparent={false}
    visible={visibe}
    onRequestClose={closeModal}>
    <View>
      <ScrollView contentContainerStyle={apply(C.justifyCenter, C.px6)}>
        {pokemon && <PokemonDetails pokemon={pokemon} />}
      </ScrollView>
      <Text
        onPress={closeModal}
        style={apply(C.absolute, C.right2, C.top2, C.p3, fonts.subtitle)}>
        ⤫
      </Text>
    </View>
  </Modal>
);
