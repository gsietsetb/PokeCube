import C, { apply } from 'consistencss';
import Modal from 'modal-enhanced-react-native-web';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { pokeStore } from '../App';
import { fonts } from '../style/gStyles';
import { PokemonDetails } from './PokeSummary';


export const PokeDetailsModal = ({
  visibe = false,
  closeModal,
  pokemon = pokeStore.currentPokemon,
}) => (
  <TouchableOpacity
    activeOpacity={0.2}
    style={[C.flex, C.wFull, C.hFull]}
    onPress={closeModal}>
    <Modal isVisible={visibe} onBackdropPress={closeModal}>
      <TouchableOpacity activeOpacity={1} onPress={() => {}}>
        <View
          style={[
            C.itemsCenter,
            C.justifyCenter,
            C.bgWhite,
            C.radius2,
          ]}>
          {pokemon && <PokemonDetails pokemon={pokemon} />}
        </View>
        )}
        <Text
          onPress={closeModal}
          style={apply(C.absolute, C.right2, C.top2, C.p3, fonts.subtitle)}>
          ⤫
        </Text>
      </TouchableOpacity>
    </Modal>
  </TouchableOpacity>
);
