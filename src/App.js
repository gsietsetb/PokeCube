import C, {apply, extend} from 'consistencss';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  LogBox,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PokeDetailsModal} from './Comp/PokeDetailsModal';
import {PokeSummary} from './Comp/PokeSummary';
import {PokeStore} from './store/pokeStore';
import {
  colors,
  deviceHeight,
  deviceWidth,
  fonts,
  headerWrapper,
  imgs,
  imgXS,
} from './style/gStyles';

extend({colors: {...colors}});

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning', 'MobX']);
export const pokeStore = PokeStore();
const App = observer(() => {
  const {filterList, loading, count} = pokeStore;
  const fetchPokemon = () => pokeStore.fetchList();

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <SafeAreaView style={apply(C.flex, C.itemsCenter)}>
      <View style={headerWrapper}>
        <View style={apply(C.row)}>
          <Image
            resizeMode={'contain'}
            source={imgs.sideCube}
            style={[imgXS, C.mr4]}
          />
          <Text style={[fonts.title1, C.selfCenter]}>PokéCube</Text>
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
          ({filterList.length} / {count}) {pokeStore.search.length > 0 && '❌'}
        </Text>
      </View>

      <View
        style={apply(C.flex, {
          minHeight: deviceHeight * 0.8,
          width: deviceWidth * 0.9,
        })}>
        <FlatList
          data={filterList}
          refreshing={loading}
          ListFooterComponent={
            loading && <ActivityIndicator animating size="large" />
          }
          extraData={pokeStore}
          onScrollEndDrag={() => pokeStore.fetchList(true)}
          onRefresh={fetchPokemon}
          onMomentumScrollBegin={() => pokeStore.fetchList(true)}
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

      <TouchableOpacity
        style={[
          C.bgBlue,
          C.shadow,
          C.px4,
          C.py2,
          C.radius3,
          C.absolute,
          C.bottom10,
        ]}
        onPress={() => {
          pokeStore.fetchList(true);
          window.scrollTo(0, 1200);
        }}>
        {loading ? (
          <ActivityIndicator animating size="large" />
        ) : (
          <Text style={[fonts.body1, C.textWhite]}>Load 20 more...</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default App;
