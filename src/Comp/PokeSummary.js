import C, {apply} from 'consistencss';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {pokeStore} from '../App';
import {fetchAPI, PokemonStore, statIconMap} from '../store/pokeStore';
import {
  bordColor,
  cell,
  colors,
  deviceHeight,
  deviceWidth,
  fonts,
  grad,
  imgBig,
  isWeb,
  textColor,
} from '../style/gStyles';

export const ImgCarrousel = ({imgs = [], isSmall = false}) => {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = () => {
    setImgIndex(imgIndex < imgs.length - 1 ? imgIndex + 1 : 0);
  };
  const prevImg = () => {
    setImgIndex(imgIndex === 0 ? imgs.length : imgIndex - 1);
  };
  return (
    <View style={apply(C.justifyCenter, C.itemsCenter)}>
      <Image
        source={{
          uri: imgs[imgIndex],
        }}
        style={isSmall ? imgBig : cell.XXL}
      />
      <View style={apply(C.row, C.p1, C.itemsCenter)}>
        <Text style={apply(fonts.body1, C.p2)} onPress={() => prevImg()}>
          ◀️
        </Text>
        <Text style={apply(fonts.body1)}>
          {imgIndex} / {imgs.length}
        </Text>
        <Text onPress={() => nextImg()} style={apply(fonts.body1, C.p2)}>
          ▶️
        </Text>
      </View>
    </View>
  );
};

export const PokeStats = ({list = []}) =>
  list && (
    <FlatList
      data={list}
      style={apply(C.bgPaleGreyTwo, C.shadowMd, C.radius2)}
      horizontal={isWeb}
      numColumns={!isWeb ? 3 : 1}
      renderItem={({item}) => (
        <Text style={apply(fonts.body1, C.textBlue, C.mr2, C.p2)}>
          {statIconMap[item.stat.name]} {item.base_stat}
        </Text>
      )}
    />
  );
const mainSkills = [
  {icon: '⭐', name: 'base_experience'},
  {icon: '📏', name: 'height', unit: 'cm'},
  {
    icon: '⚖️',
    name: 'weight',
    unit: 'kg',
  },
];

export const MainSkills = ({extra}) => (
  <View style={[C.row, C.my3, C.justifyCenter, C.itemsCenter]}>
    {mainSkills.map(({unit, name, icon}) => (
      <View style={[C.row, C.mr4]}>
        <Text style={apply(fonts.body1)}>{icon}</Text>
        <Text style={apply(fonts.body1, C.mx2, C.selfCenter)}>
          {extra[name]}
        </Text>
        {unit && (
          <Text style={apply(fonts.caption, C.selfCenter, C.textGrey)}>
            {unit}
          </Text>
        )}
      </View>
    ))}
  </View>
);

/**In order to show the Sprite and other skills,
 *  we need to load all the Pokemon info,
 * even though is not the most efficient approach...*/
export const PokeSummary = ({url, name}) => {
  const [currImgs, setImgs] = useState([]);
  const [extra, setExtra] = useState([]);

  const fetchCurrent = useCallback(async () => {
    const data = await fetchAPI({url: url});
    setImgs(
      Object.values(data?.sprites).filter(
        value => value?.toString()[0].toLowerCase() === 'h',
      ),
    );
    setExtra(data);
  }, [url]);
  useEffect(() => fetchCurrent(), [fetchCurrent]);
  return (
    <TouchableOpacity
      style={apply(
        C.row,
        C.my4,
        C.mx1,
        C.radius2,
        C.shadowMd,
        C.itemsCenter,
        C.flex,
      )}
      onPress={() => {
        pokeStore.setModal(true);
        pokeStore.setCurrentPokemon(
          PokemonStore({extra, imgs: currImgs, url, name}),
        );
      }}>
      <ImgCarrousel imgs={currImgs} isSmall />

      {/**Content*/}
      <View style={[C.itemsStart]}>
        <Text style={apply(fonts.subtitle, C.textBlue, C.capitalize)}>
          {extra.id} - {name}
        </Text>
        <MainSkills extra={extra} />
        {extra.stats && <PokeStats list={Object.values(extra.stats)} />}
      </View>
    </TouchableOpacity>
  );
};

export const PokemonDetails = ({pokemon, withDetails = false}) => {
  const {extra, name} = pokemon;
  return (
    <View>
      {pokemon?.imgs && <ImgCarrousel imgs={pokemon?.imgs} />}

      {/**Content*/}
      <View style={[C.itemsCenter]}>
        <Text style={apply(fonts.subtitle, C.textBlue, C.capitalize)}>
          {extra.id} - {name}
        </Text>
        <MainSkills extra={extra} />

        {extra.stats && <PokeStats list={Object.values(extra.stats)} />}

        <Text style={[fonts.subtitle, C.selfStart, C.my4]}> Moves</Text>
        <FlatList
          data={Object.values(extra.moves)}
          numColumns={4}
          style={[
            {
              maxHeight: deviceHeight * 0.5,
              width: deviceWidth * 0.8,
            },
            bordColor(colors.blue),
            C.radius2,
            C.my4,
          ]}
          renderItem={({item, index}) => (
            <Text
              style={[
                fonts.body2,
                C.p2,
                C.capitalize,
                C.flex,
                C.selfCenter,
                textColor(
                  grad(
                    1 - index / Object.values(extra.moves).length,
                  ).toString(),
                ),
              ]}>
              {item.move.name}
            </Text>
          )}
        />
      </View>
    </View>
  );
};
