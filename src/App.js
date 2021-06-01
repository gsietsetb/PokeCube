import C, { apply, extend } from 'consistencss';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { FlatList, Image, Linking, LogBox, SafeAreaView, Text, TextInput, View } from 'react-native';
import { PokeDetailsModal } from './Comp/PokeDetailsModal';
import { PokeSummary } from './Comp/PokeSummary';
import { PokeStore } from './store/pokeStore';
import { colors, deviceHeight, deviceWidth, fonts, headerWrapper, imgBig, imgs, imgSmall } from './style/gStyles';

extend({colors: {...colors}});

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning', 'MobX']);
export const pokeStore = PokeStore();
const App = observer(() => {
  const {filterList, loading} = pokeStore;
  const fetchPokemon = () => pokeStore.fetchList();

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <SafeAreaView style={apply(C.flex, C.itemsCenter)}>
      <View style={headerWrapper}>
        <View style={apply(C.row)}>
          <Image resizeMode={'contain'} source={imgs.charm} style={imgSmall} />
          <Text style={[fonts.title1, C.selfCenter]}>PokéPedia</Text>
        </View>
        <Text
          onPress={() => Linking.openURL('https://guillesierra.com/')}
          style={[fonts.title1, C.selfCenter, C.textBlue, C.mr2]}>
          🌍 Guille Sierra
        </Text>
      </View>

      {/**SearchBar*/}
      <View
        style={apply(
          C.row,
          C.itemsCenter,
          C.shadowMd,
          C.py1,
          C.px2,
          C.my4,
          C.mx1,
          C.radius4,
          C.bgWhite,
          {width: deviceWidth * 0.9},
        )}>
        <Text style={C.mx2}>🔍</Text>
        <TextInput
          style={[C.p2, C.flex]}
          placeholder={'Search a Pokémon...'}
          onChangeText={text => pokeStore.setSearch(text)}
          value={pokeStore.search}
        />
        <Text
          style={[C.mx2, C.textBlue]}
          onPress={() => pokeStore.clearSearch()}>
          ({filterList.length}) {pokeStore.search.length > 0 && '❌'}
        </Text>
      </View>

      <View style={apply(C.flex, {minHeight: deviceHeight * 0.8, width: deviceWidth * 0.9})}>
        <FlatList
          data={filterList}
          refreshing={loading}
          ListEmptyComponent={
            <Image resizeMode={'contain'} source={imgs.spin} style={imgBig} />
          }
          extraData={pokeStore}
          onScrollEndDrag={() => pokeStore.fetchList(true)}
          onRefresh={fetchPokemon}
          keyExtractor={({key}) => key}
          renderItem={({item, index}) => (
            <PokeSummary url={item.url} name={item.name} />
          )}
        />
      </View>
      <PokeDetailsModal
        visibe={pokeStore.showModal}
        pokemon={pokeStore.currentPokemon}
        closeModal={() => pokeStore.setModal()}
      />
    </SafeAreaView>
  );
});

export default App;
